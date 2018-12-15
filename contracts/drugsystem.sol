pragma solidity ^0.4.25;

contract DrugSystem {
    struct Drug {
        string name;
        string manufacturer;
        string batchNo;
        string manufacturingDate;
        string expiryDate;
        string contents;
        string usage;
        string sideEffects;
        bool recalled;

        //address drug;
        address[] users;
    }

    mapping (address => Drug) drugs;
    address[] storedKeys;

    event recall(address value);
    
    
    constructor() public {
        address a = getUniqueId();
        Drug memory d;

        d.name = "Clarinase Tablet 120mg";
        d.manufacturer = "Cutik Medicare Pvt Ltd";
        d.batchNo ="71RPG74A01";
        d.manufacturingDate = "12-09-2016";
        d.expiryDate = "12-09-2016";
        d.contents = "Loratadine, Pseudoephedrine";
        d.usage = "Cold, Sneezing, Runny nose, Itchy nose, Eye irritation, Red and itchy skin, Skin disorders, Allergies, High fever, Sinus congestion and pressure";
        d.sideEffects = "Headache, Drowsiness, Unusual tiredness and weakness, Sleeplessness, Stomach pain, diarrhea, Hives and wheezing, Difficulty in breathing, Swelling of face, lips, eyelids, tongue, hands and feet, Impaired Liver function, Influenza, Upper respiratory tract infection";
        d.recalled = false;

        drugs[a] = d;
        storedKeys.push(a);
    }
    
    function recallDrug(address drug) public {
        drugs[drug].recalled = true;
        emit recall(drug);
    }

    function getUniqueId() public view returns (address) 
    {

        bytes20 b = bytes20(keccak256(msg.sender, now));
        uint addr = 0;
        for (uint index = b.length-1; index+1 > 0; index--) {
            addr += uint(b[index]) * ( 16 ** ((b.length - index - 1) * 2));
        }

        return address(addr);
    }
    
    function getNthDrugName(uint n) public view returns (string) {
        return drugs[storedKeys[n]].name;
    }

    function isRecalled(address drug) public view returns (bool) {
        return drugs[drug].recalled;
    }
}