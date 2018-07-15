var Realm = require('realm');
let realm;
export default realm = new Realm({
      schema: [
        {
          name: 'Add_Person',
          properties:
          {
            reportids:{type:'int'},
            fieldids:{type:'int'},
            person_id: { type: 'int', default: 0 },
            person_firstname: 'string',
            person_lastname: 'string',
            person_middlename: 'string',
            person_address_country: 'string',
            person_address_state: 'string',
            person_address_city: 'string',
            person_address_postalcode: 'string',
            person_address_streetaddress: 'string',
            person_address_apartmentnumber: 'string',
            person_age: 'string',
            person_licensenumber: 'string',
            person_SSN: 'string',
            person_Gender: 'string',
            person_Eyes: 'string',
            person_hair: 'string',
            person_height: 'string',
            person_weight: 'string',
            person_Race: 'string',
            person_ethnicity: 'string',
            person_citizenship: 'string',
            person_HomePhone: 'string',
            person_workphone: 'string',
            person_cellphone: 'string',
            person_otherphone: 'string',
            person_image: 'string'

          }
        },
         {
          name: 'Add_Charge',
          properties:
          {
            fieldids:{type:'int'},
            charge_id: { type: 'int', default: 0 },
            charge_code: 'string',
            charge_modifier: 'string',
            charge_offense_date: 'string',
            charge_type: 'string',
            charge_counts: 'string',
            }
        },
        {
          name: 'Add_Charge_Citation',
          properties:
          {
            fieldids:{type:'int'},
            charge_id: { type: 'int', default: 0 },
            charge_violation: 'string',
            charge_ordinance: 'string',
            charge_Court_Date: 'string',
            charge_Compliance_Date: 'string',
            charge_Fee_Amount: 'string',
            charge_Comments : 'string',
            }
        },
        {
          name: 'Add_Vehicle',
          properties:
          {
            reportids:{type:'int'},
            fieldids:{type:'int'},
            vehicle_id: { type: 'int', default: 0 },
            vehicle_plate: 'string',
            vehicle_plateyear: 'string',
            vehicle_platetype: 'string',
            vehicle_patestate: 'string',
            vehicle_year: 'string',
            vehicle_Color: 'string',
            vehicle_Color2: 'string',
            vehicle_VIN: 'string',
            vehicle_BodyStyle: 'string',
            vehicle_Bodytype: 'string',
            vehicle_Notes: 'string',
            vehicle_image: 'string'

          }
        },
        {
          name: 'Field_Interview_Info',
          properties:
          {
            fieldID: { type: 'int', default: 0 },
            person_add: 'Add_Person[]',
            vehicle_add: 'Add_Vehicle[]',
            location_country: 'string',
            location_state: 'string',
            location_city: 'string',
            location_postalcode: 'string',
            location_streetaddress: 'string',
            location_apartmentnumber: 'string',
            location_narrative: 'string',
            location_image: 'string',
            createtime: 'string',
            reportname: 'string',

          }
        }
        ,

        {
          name: 'Booking_Info',
          properties:
          {
            BookingID: { type: 'int', default: 0 },
            person_add: 'Add_Person[]',
            charge_add: 'Add_Charge[]',
            location_narrative: 'string',
            location_image: 'string',
            createtime: 'string',
            reportname: 'string',
          }
        },

        {
          name: 'Citation_Info',
          properties:
          {
            CitationID: { type: 'int', default: 0 },
            person_add: 'Add_Person[]',
            vehicle_add: 'Add_Vehicle[]',
            location_country: 'string',
            location_state: 'string',
            location_city: 'string',
            location_postalcode: 'string',
            location_streetaddress: 'string',
            location_apartmentnumber: 'string',
            add_charge: 'Add_Charge_Citation[]',
            location_narrative: 'string',
            location_image: 'string',
            createtime: 'string',
            reportname: 'string',

          }
        },

        {
          name: 'Accident_Supplement_Info',
          properties:
          {
            accidentsupplementID: { type: 'int', default: 0 },
            person_add: 'Add_Person[]',
            vehicle_add: 'Add_Vehicle[]',
            location_country: 'string',
            location_state: 'string',
            location_city: 'string',
            location_postalcode: 'string',
            location_streetaddress: 'string',
            location_apartmentnumber: 'string',
            location_narrative: 'string',
            location_image: 'string',
            createtime: 'string',
            reportname: 'string',

          }
        }
        ]
    });