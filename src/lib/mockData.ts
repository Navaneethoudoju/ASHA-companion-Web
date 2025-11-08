export const mockUser = {
  id: 1,
  name: "Sita Devi",
  role: "ASHA" as const,
  phone: "9876543210",
  email: "sita@asha.com",
  password: "asha123",
  villageId: 1
};

export const mockAllUsers = [
  { id: 1, name: "Sita Devi", role: "ASHA" as const, phone: "9876543210", email: "sita@asha.com", password: "asha123", villageId: 1 },
  { id: 2, name: "Rekha Kumari", role: "ANM" as const, phone: "9123456789", email: "rekha@phc.com", password: "anm123", villageId: 1 },
  { id: 3, name: "Dr. Amit Kumar", role: "PHC" as const, phone: "9111222333", email: "amit@phc.com", password: "phc123", villageId: null },
  { id: 4, name: "Admin User", role: "ADMIN" as const, phone: "9999999999", email: "admin@system.com", password: "admin123", villageId: null }
];

export const mockVillages = [
  { id: 1, name: "Rampur", block: "Sadar", district: "Patna" },
  { id: 2, name: "Shyampur", block: "Sadar", district: "Patna" }
];

export const mockHouseholds = [
  { id: 1, villageId: 1, headName: "Ram Kumar", address: "Near Temple", membersCount: 5 },
  { id: 2, villageId: 1, headName: "Shyam Prasad", address: "Main Road", membersCount: 4 },
  { id: 3, villageId: 1, headName: "Mohan Lal", address: "School Street", membersCount: 6 }
];

export const mockPregnancies = [
  { id: 1, personName: "Geeta Devi", lmpDate: "2024-08-15", expectedDelivery: "2025-05-22", ancVisits: 3, riskStatus: "Normal" },
  { id: 2, personName: "Sita Kumari", lmpDate: "2024-09-01", expectedDelivery: "2025-06-08", ancVisits: 2, riskStatus: "High Risk" }
];

export const mockChildren = [
  { id: 1, name: "Raju Kumar", dob: "2024-01-15", weight: "8.5 kg", immunizationStatus: "Pending BCG" },
  { id: 2, name: "Pinki Kumari", dob: "2023-06-20", weight: "10.2 kg", immunizationStatus: "Up to date" }
];

export const mockMedicine = [
  { id: 1, name: "ORS Packets", availableQty: 50, expiryDate: "2025-12-31" },
  { id: 2, name: "Iron Tablets", availableQty: 120, expiryDate: "2025-08-15" },
  { id: 3, name: "Vitamin A", availableQty: 30, expiryDate: "2025-06-20" }
];

export const mockVisits = [
  { id: 1, householdName: "Ram Kumar", visitDate: "2024-11-07", purpose: "ANC Checkup", remarks: "All normal" },
  { id: 2, householdName: "Shyam Prasad", visitDate: "2024-11-06", purpose: "Child Immunization", remarks: "BCG given" }
];

export const mockASHAWorkers = [
  { id: 1, name: "Sita Devi", village: "Rampur", phone: "9876543210", totalHouseholds: 45, pendingVisits: 8 },
  { id: 2, name: "Rekha Kumari", village: "Shyampur", phone: "9123456789", totalHouseholds: 38, pendingVisits: 5 }
];

export const mockUsers = [
  { id: 1, name: "Sita Devi", role: "ASHA", phone: "9876543210", email: "sita@asha.com", village: "Rampur" },
  { id: 2, name: "Rekha Kumari", role: "ANM", phone: "9123456789", email: "rekha@phc.com", village: "Shyampur" },
  { id: 3, name: "Dr. Amit Kumar", role: "PHC", phone: "9111222333", email: "amit@phc.com", village: "-" },
  { id: 4, name: "Admin User", role: "ADMIN", phone: "9999999999", email: "admin@system.com", village: "-" }
];
