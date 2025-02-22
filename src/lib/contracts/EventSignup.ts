export const eventSignupABI = [{ "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_description", "type": "string" }, { "internalType": "uint16", "name": "_maxCapacity", "type": "uint16" }, { "internalType": "uint256", "name": "_signupStartTime", "type": "uint256" }, { "internalType": "uint256", "name": "_signupEndTime", "type": "uint256" }, { "internalType": "uint256", "name": "_eventStartTime", "type": "uint256" }, { "internalType": "uint256", "name": "_eventEndTime", "type": "uint256" }, { "internalType": "uint8", "name": "_rewardCost", "type": "uint8" }, { "internalType": "address", "name": "_tokenAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "metadata", "type": "string" }], "name": "CheckedIn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "creator", "type": "address" }], "name": "Deactivated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "uint16", "name": "maxCapacity", "type": "uint16" }], "name": "EventCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "attendee", "type": "address" }, { "indexed": false, "internalType": "string", "name": "metadata", "type": "string" }], "name": "SignedUp", "type": "event" }, { "inputs": [], "name": "checkIn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "checkedIn", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deactivate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "eventDetails", "outputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint16", "name": "maxCapacity", "type": "uint16" }, { "internalType": "uint256", "name": "signupStartTime", "type": "uint256" }, { "internalType": "uint256", "name": "signupEndTime", "type": "uint256" }, { "internalType": "uint256", "name": "eventStartTime", "type": "uint256" }, { "internalType": "uint256", "name": "eventEndTime", "type": "uint256" }, { "internalType": "uint8", "name": "rewardCost", "type": "uint8" }, { "internalType": "uint16", "name": "attendeeCount", "type": "uint16" }, { "internalType": "bool", "name": "isActive", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllMetadata", "outputs": [{ "internalType": "string[]", "name": "", "type": "string[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMetadata", "outputs": [{ "internalType": "string", "name": "metadata", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "hasRedeemed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isAttendee", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "metadata", "type": "string" }], "name": "signUp", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token", "outputs": [{ "internalType": "contract Token", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }] as const;
