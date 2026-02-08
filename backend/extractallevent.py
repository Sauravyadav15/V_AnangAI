import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

BASE_URL = "https://www.visitkingston.ca"
LISTING_FILE = BASE_DIR / "webScraper" / "newevnt.html"
OUTPUT_FILE = BASE_DIR / "Events" / "dataevent.txt"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}


def parse_date_range(date_text, iso_date=""):
    """Parse date range text to extract start and end dates."""
    start_date = ""
    end_date = ""
    
    # Try to extract date range like "January 29 - February 7, 2026"
    date_range_pattern = r"([A-Za-z]+ \d{1,2}) - ([A-Za-z]+ \d{1,2}, \d{4})"
    match = re.search(date_range_pattern, date_text)
    if match:
        # Extract year from end date and add to start date
        year = match.group(2).split()[-1]
        start_date = f"{match.group(1)}, {year}"
        end_date = match.group(2)
    else:
        # Try date range like "February 1 - 16, 2026" (end date without month)
        date_range_short_pattern = r"([A-Za-z]+ \d{1,2}) - (\d{1,2}, \d{4})"
        match = re.search(date_range_short_pattern, date_text)
        if match:
            month = match.group(1).split()[0]  # Extract month from start date
            year = match.group(2).split()[-1]  # Extract year
            start_date = f"{match.group(1)}, {year}"
            end_date = f"{month} {match.group(2)}"
        else:
            # Try single date like "February 7, 2026"
            single_date_pattern = r"([A-Za-z]+ \d{1,2}, \d{4})"
            match = re.search(single_date_pattern, date_text)
            if match:
                start_date = match.group(1)
                end_date = match.group(1)  # Same date for start and end
            elif iso_date:
                # Fallback: convert ISO date to readable format
                try:
                    dt = datetime.strptime(iso_date, "%Y-%m-%d")
                    formatted_date = dt.strftime("%B %d, %Y")
                    start_date = formatted_date
                    end_date = formatted_date
                except ValueError:
                    pass
    
    return start_date, end_date


def extract_events_from_cards():
    """Extract event data from the HTML file containing event cards."""
    with open(str(LISTING_FILE), "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    events = []
    
    # Find all event card links
    event_cards = soup.find_all("a", class_=lambda x: x and "group" in x.split() if x else False, href=True)
    
    for card in event_cards:
        if "/events/" not in card.get("href", ""):
            continue
            
        event_url = urljoin(BASE_URL, card["href"])
        
        # Extract event name
        name_elem = card.find("p", class_=lambda x: x and "typo-h4" in x.split() if x else False)
        event_name = name_elem.get_text(strip=True) if name_elem else ""
        
        # Extract start date from datetime attribute
        time_elem = card.find("time", datetime=True)
        start_date_iso = time_elem.get("datetime", "") if time_elem else ""
        
        # Extract date range text and location from the description paragraph
        desc_elem = card.find("p", class_=lambda x: x and "font-body" in x.split() and "text-14" in x.split() if x else False)
        date_time_location_text = desc_elem.get_text("\n", strip=True) if desc_elem else ""
        
        # Parse date range
        start_date, end_date = parse_date_range(date_time_location_text, start_date_iso)
        
        # Extract location name (usually after the <br> tag)
        location_name = ""
        if desc_elem:
            # Find all <br> tags and get text after the last one
            br_tags = desc_elem.find_all("br")
            if br_tags:
                # Get all text after the last <br> tag
                last_br = br_tags[-1]
                location_name = "".join(last_br.next_siblings).strip()
            else:
                # Fallback: Split by newline (which represents <br> tags in get_text)
                parts = date_time_location_text.split("\n")
                if len(parts) > 1:
                    # Location is usually the last part after date/time
                    location_name = parts[-1].strip()
        
        events.append({
            "name": event_name,
            "start_date": start_date,
            "end_date": end_date,
            "start_date_iso": start_date_iso,
            "location_name": location_name,
            "url": event_url
        })
    
    return events


def extract_location_info(url):
    """Extract location address and Google Maps URL from event detail page."""
    try:
        response = requests.get(url, headers=HEADERS, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        
        location_address = ""
        google_maps_url = ""
        
        # Try to find Google Maps link
        for a in soup.find_all("a", href=True):
            if "google.com/maps" in a["href"]:
                google_maps_url = a["href"]
                # Extract address from the link text
                link_text = a.get_text(strip=True)
                if link_text:
                    location_address = link_text
                else:
                    # Try to extract from the href query parameters
                    href = a["href"]
                    # Look for place name in the URL
                    if "place/" in href:
                        address_part = href.split("place/")[-1].split("/")[0]
                        location_address = address_part.replace("%20", " ").replace("%2C", ",")
                break
        
        # If no Google Maps link, try to find address in other elements
        if not location_address:
            # Look for address-like text patterns
            for elem in soup.find_all(["p", "div", "span"]):
                text = elem.get_text(strip=True)
                # Check if it looks like an address (contains street number and name)
                if re.search(r"\d+\s+[A-Za-z\s]+(?:Street|St|Road|Rd|Avenue|Ave|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Court|Ct)", text, re.IGNORECASE):
                    location_address = text
                    break
        
        return location_address, google_maps_url
        
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return "", ""


def save_to_file(events):
    """Save events to output file."""
    with open(str(OUTPUT_FILE), "w", encoding="utf-8") as f:
        for e in events:
            # Use empty string if field is missing
            name = e.get('name', '')
            start_date = e.get('start_date', '')
            end_date = e.get('end_date', '')
            location_name = e.get('location_name', '')
            location_address = e.get('location_address', '')
            google_maps_url = e.get('google_maps_url', '')
            
            line = (
                f"{name} | {start_date} | {end_date} | "
                f"{location_name} | {location_address} | {google_maps_url}\n"
            )
            f.write(line)


def main():
    print("Extracting events from cards...")
    events = extract_events_from_cards()
    print(f"Found {len(events)} events")
    
    print("Fetching location addresses and Google Maps URLs from detail pages...")
    for i, event in enumerate(events, 1):
        print(f"Processing {i}/{len(events)}: {event['name']}")
        location_address, google_maps_url = extract_location_info(event["url"])
        event["location_address"] = location_address
        event["google_maps_url"] = google_maps_url
    
    print("Saving to file...")
    save_to_file(events)
    print(f"Saved {len(events)} events to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()