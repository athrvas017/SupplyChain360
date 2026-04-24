import json
import os

BOM_FILE = "data/hs_bom_map.json"
MOCK_DATA_FILE = "data/mock_trade_data.json"

with open(BOM_FILE, "r") as f:
    bom = json.load(f)

# Update BOM map
bom.update({
    "870322": ["840734", "870899", "854430", "4011", "7007", "7210"],
    "870323": ["840734", "870899", "854430", "4011", "7007", "7210", "870850"],
    "870324": ["840734", "870899", "854430", "4011", "7007", "7210", "870850"],
    "870340": ["840734", "850153", "850760", "870899", "854430"],
    "870360": ["840734", "850153", "850760", "870899", "854430", "870850"],
    "870380": ["850153", "850760", "870899", "854430", "870880", "870850"],
    "870431": ["840734", "870899", "870600", "7208", "4011"],
    "870600": ["7208", "7225", "840734", "870850"],
    "840734": ["7225", "7408", "8481", "8482", "8483"],
    "870850": ["7225", "8482", "8483"],
    "870880": ["7225", "4011"],
    "870899": ["7304", "8481", "8537"],
    "854430": ["7408", "3901"],
    "850153": ["7225", "7408", "8503", "8482"],
    "850760": ["2825", "8105", "7408", "7606", "3901"]
})

with open(BOM_FILE, "w") as f:
    json.dump(bom, f, indent=2)

with open(MOCK_DATA_FILE, "r") as f:
    mock_data = json.load(f)

# Update mock trade data companies
new_companies = {
    "GENERAL MOTORS COMPANY": {
      "country": "US", "city": "Detroit", "lat": 42.33, "lng": -83.04, "role": "importer",
      "shipments": [
        {"shipper": "GM KOREA COMPANY", "shipper_country": "KR", "hs_code": "870322", "hs_description": "Passenger motor vehicles, compact", "weight_kg": 4500000, "port_of_loading": "Incheon", "port_of_unlading": "Long Beach", "shipment_count": 850},
        {"shipper": "GENERAL MOTORS DE MEXICO", "shipper_country": "MX", "hs_code": "870323", "hs_description": "Passenger motor vehicles, SUV", "weight_kg": 8500000, "port_of_loading": "Veracruz", "port_of_unlading": "Houston", "shipment_count": 1200},
        {"shipper": "GENERAL MOTORS DE MEXICO", "shipper_country": "MX", "hs_code": "870431", "hs_description": "Light pickup trucks", "weight_kg": 9200000, "port_of_loading": "Veracruz", "port_of_unlading": "Houston", "shipment_count": 1500},
        {"shipper": "ISUZU MOTORS LIMITED", "shipper_country": "JP", "hs_code": "870600", "hs_description": "Chassis fitted with engines", "weight_kg": 1500000, "port_of_loading": "Yokohama", "port_of_unlading": "Los Angeles", "shipment_count": 350}
      ]
    },
    "GM KOREA COMPANY": {
      "country": "KR", "city": "Incheon", "lat": 37.49, "lng": 126.70, "role": "manufacturer",
      "shipments": [
        {"shipper": "LG INNOTEK CO LTD", "shipper_country": "KR", "hs_code": "854430", "hs_description": "Wiring harnesses", "weight_kg": 120000, "port_of_loading": "Busan", "port_of_unlading": "Incheon", "shipment_count": 210},
        {"shipper": "HL MANDO CORPORATION", "shipper_country": "KR", "hs_code": "870880", "hs_description": "Suspension components", "weight_kg": 340000, "port_of_loading": "Busan", "port_of_unlading": "Incheon", "shipment_count": 420}
      ]
    },
    "GENERAL MOTORS DE MEXICO": {
      "country": "MX", "city": "Silao", "lat": 20.94, "lng": -101.42, "role": "manufacturer",
      "shipments": [
        {"shipper": "NIDEC CORPORATION", "shipper_country": "JP", "hs_code": "850153", "hs_description": "Traction motors", "weight_kg": 540000, "port_of_loading": "Osaka", "port_of_unlading": "Manzanillo", "shipment_count": 320},
        {"shipper": "BOSCH MOBILITY", "shipper_country": "DE", "hs_code": "840734", "hs_description": "Engine components", "weight_kg": 210000, "port_of_loading": "Hamburg", "port_of_unlading": "Veracruz", "shipment_count": 150}
      ]
    },
    "TOYOTA MOTOR NORTH AMERICA INC.": {
      "country": "US", "city": "Plano", "lat": 33.01, "lng": -96.69, "role": "importer",
      "shipments": [
        {"shipper": "TOYOTA MOTOR CORPORATION", "shipper_country": "JP", "hs_code": "870323", "hs_description": "Passenger vehicles", "weight_kg": 12000000, "port_of_loading": "Nagoya", "port_of_unlading": "Long Beach", "shipment_count": 2100},
        {"shipper": "TOYOTA MOTOR CORPORATION", "shipper_country": "JP", "hs_code": "870340", "hs_description": "HEV passenger vehicles", "weight_kg": 8500000, "port_of_loading": "Nagoya", "port_of_unlading": "Los Angeles", "shipment_count": 1400},
        {"shipper": "TOYOTA MOTOR CORPORATION", "shipper_country": "JP", "hs_code": "840734", "hs_description": "Engine assemblies", "weight_kg": 450000, "port_of_loading": "Nagoya", "port_of_unlading": "Seattle", "shipment_count": 450},
        {"shipper": "DENSO CORPORATION", "shipper_country": "JP", "hs_code": "870899", "hs_description": "Automotive parts and accessories", "weight_kg": 650000, "port_of_loading": "Nagoya", "port_of_unlading": "Los Angeles", "shipment_count": 520},
        {"shipper": "AISIN CORPORATION", "shipper_country": "JP", "hs_code": "870850", "hs_description": "Drive axles", "weight_kg": 320000, "port_of_loading": "Nagoya", "port_of_unlading": "Long Beach", "shipment_count": 280}
      ]
    },
    "TOYOTA MOTOR CORPORATION": {
      "country": "JP", "city": "Toyota", "lat": 35.08, "lng": 137.15, "role": "manufacturer",
      "shipments": [
        {"shipper": "NIPPON STEEL CORPORATION", "shipper_country": "JP", "hs_code": "7210", "hs_description": "Steel sheets", "weight_kg": 2500000, "port_of_loading": "Nagoya", "port_of_unlading": "Nagoya", "shipment_count": 890},
        {"shipper": "PANASONIC ENERGY CO LTD", "shipper_country": "JP", "hs_code": "850760", "hs_description": "Lithium-ion cells", "weight_kg": 850000, "port_of_loading": "Osaka", "port_of_unlading": "Nagoya", "shipment_count": 410}
      ]
    },
    "DENSO CORPORATION": {
      "country": "JP", "city": "Kariya", "lat": 34.99, "lng": 137.00, "role": "manufacturer",
      "shipments": [
        {"shipper": "RENESAS ELECTRONICS CORP", "shipper_country": "JP", "hs_code": "854231", "hs_description": "Automotive MCUs", "weight_kg": 12000, "port_of_loading": "Tokyo", "port_of_unlading": "Nagoya", "shipment_count": 140}
      ]
    },
    "AISIN CORPORATION": {
      "country": "JP", "city": "Kariya", "lat": 34.99, "lng": 137.00, "role": "manufacturer",
      "shipments": [
        {"shipper": "JFE STEEL CORPORATION", "shipper_country": "JP", "hs_code": "7225", "hs_description": "Specialty steel", "weight_kg": 450000, "port_of_loading": "Yokohama", "port_of_unlading": "Nagoya", "shipment_count": 250}
      ]
    },
    "BMW MANUFACTURING CO. LLC": {
      "country": "US", "city": "Spartanburg", "lat": 34.89, "lng": -81.97, "role": "importer",
      "shipments": [
        {"shipper": "BMW AG", "shipper_country": "DE", "hs_code": "870324", "hs_description": "Luxury passenger vehicles", "weight_kg": 5400000, "port_of_loading": "Bremerhaven", "port_of_unlading": "Charleston", "shipment_count": 920},
        {"shipper": "BMW AG", "shipper_country": "DE", "hs_code": "870360", "hs_description": "PHEV luxury vehicles", "weight_kg": 3200000, "port_of_loading": "Bremerhaven", "port_of_unlading": "Charleston", "shipment_count": 540},
        {"shipper": "ZF FRIEDRICHSHAFEN AG", "shipper_country": "DE", "hs_code": "870850", "hs_description": "Drive axles and diffs", "weight_kg": 850000, "port_of_loading": "Hamburg", "port_of_unlading": "Charleston", "shipment_count": 410},
        {"shipper": "YAZAKI CORPORATION", "shipper_country": "JP", "hs_code": "854430", "hs_description": "Ignition wiring sets", "weight_kg": 150000, "port_of_loading": "Tokyo", "port_of_unlading": "Charleston", "shipment_count": 280},
        {"shipper": "LEONI AG", "shipper_country": "DE", "hs_code": "854430", "hs_description": "Wiring harnesses", "weight_kg": 120000, "port_of_loading": "Hamburg", "port_of_unlading": "Charleston", "shipment_count": 200}
      ]
    },
    "BMW AG": {
      "country": "DE", "city": "Munich", "lat": 48.13, "lng": 11.58, "role": "manufacturer",
      "shipments": [
        {"shipper": "BOSCH MOBILITY", "shipper_country": "DE", "hs_code": "840734", "hs_description": "Engine parts", "weight_kg": 750000, "port_of_loading": "Stuttgart", "port_of_unlading": "Munich", "shipment_count": 450},
        {"shipper": "SAMSUNG SDI CO LTD", "shipper_country": "KR", "hs_code": "850760", "hs_description": "Battery cells", "weight_kg": 1200000, "port_of_loading": "Busan", "port_of_unlading": "Hamburg", "shipment_count": 380}
      ]
    },
    "ZF FRIEDRICHSHAFEN AG": {
      "country": "DE", "city": "Friedrichshafen", "lat": 47.65, "lng": 9.48, "role": "manufacturer",
      "shipments": [
        {"shipper": "THYSSENKRUPP STEEL", "shipper_country": "DE", "hs_code": "7225", "hs_description": "Steel alloys", "weight_kg": 950000, "port_of_loading": "Hamburg", "port_of_unlading": "Friedrichshafen", "shipment_count": 310}
      ]
    },
    "YAZAKI CORPORATION": {
      "country": "JP", "city": "Tokyo", "lat": 35.68, "lng": 139.76, "role": "manufacturer",
      "shipments": [
        {"shipper": "FURUKAWA ELECTRIC CO LTD", "shipper_country": "JP", "hs_code": "7408", "hs_description": "Copper wire", "weight_kg": 420000, "port_of_loading": "Yokohama", "port_of_unlading": "Tokyo", "shipment_count": 270}
      ]
    },
    "LEONI AG": {
      "country": "DE", "city": "Nuremberg", "lat": 49.45, "lng": 11.07, "role": "manufacturer",
      "shipments": [
        {"shipper": "AURUBIS AG", "shipper_country": "DE", "hs_code": "7408", "hs_description": "Copper wire rod", "weight_kg": 560000, "port_of_loading": "Hamburg", "port_of_unlading": "Nuremberg", "shipment_count": 320}
      ]
    },
    "LUCID GROUP INC.": {
      "country": "US", "city": "Newark", "lat": 37.52, "lng": -122.02, "role": "importer",
      "shipments": [
        {"shipper": "SAMSUNG SDI CO LTD", "shipper_country": "KR", "hs_code": "850760", "hs_description": "Lithium-ion cells", "weight_kg": 1500000, "port_of_loading": "Busan", "port_of_unlading": "Oakland", "shipment_count": 480},
        {"shipper": "CONTINENTAL AG", "shipper_country": "DE", "hs_code": "870880", "hs_description": "Air suspension absorbers", "weight_kg": 250000, "port_of_loading": "Hamburg", "port_of_unlading": "Oakland", "shipment_count": 180},
        {"shipper": "BORGWARNER INC.", "shipper_country": "US", "hs_code": "850153", "hs_description": "AC multi-phase motors", "weight_kg": 380000, "port_of_loading": "Detroit", "port_of_unlading": "Oakland", "shipment_count": 220}
      ]
    }
}

mock_data["companies"].update(new_companies)

with open(MOCK_DATA_FILE, "w") as f:
    json.dump(mock_data, f, indent=2)

print("JSON data updated successfully.")
