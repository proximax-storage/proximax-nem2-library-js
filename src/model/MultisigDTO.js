/*
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Catapult REST API Reference
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.13
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from '../ApiClient';





/**
* The MultisigDTO model module.
* @module model/MultisigDTO
* @version 1.0.13
*/
export default class MultisigDTO {
    /**
    * Constructs a new <code>MultisigDTO</code>.
    * @alias module:model/MultisigDTO
    * @class
    * @param account {String} 
    * @param minApproval {Number} 
    * @param minRemoval {Number} 
    * @param cosignatories {Array.<String>} 
    * @param multisigAccounts {Array.<String>} 
    */

    constructor(account, minApproval, minRemoval, cosignatories, multisigAccounts) {
        

        
        

        this['account'] = account;this['minApproval'] = minApproval;this['minRemoval'] = minRemoval;this['cosignatories'] = cosignatories;this['multisigAccounts'] = multisigAccounts;

        
    }

    /**
    * Constructs a <code>MultisigDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/MultisigDTO} obj Optional instance to populate.
    * @return {module:model/MultisigDTO} The populated <code>MultisigDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MultisigDTO();

            
            
            

            if (data.hasOwnProperty('account')) {
                obj['account'] = ApiClient.convertToType(data['account'], 'String');
            }
            if (data.hasOwnProperty('accountAddress')) {
                obj['accountAddress'] = ApiClient.convertToType(data['accountAddress'], 'String');
            }
            if (data.hasOwnProperty('minApproval')) {
                obj['minApproval'] = ApiClient.convertToType(data['minApproval'], 'Number');
            }
            if (data.hasOwnProperty('minRemoval')) {
                obj['minRemoval'] = ApiClient.convertToType(data['minRemoval'], 'Number');
            }
            if (data.hasOwnProperty('cosignatories')) {
                obj['cosignatories'] = ApiClient.convertToType(data['cosignatories'], ['String']);
            }
            if (data.hasOwnProperty('multisigAccounts')) {
                obj['multisigAccounts'] = ApiClient.convertToType(data['multisigAccounts'], ['String']);
            }
        }
        return obj;
    }

    /**
    * @member {String} account
    */
    account = undefined;
    /**
    * @member {String} accountAddress
    */
    accountAddress = undefined;
    /**
    * @member {Number} minApproval
    */
    minApproval = undefined;
    /**
    * @member {Number} minRemoval
    */
    minRemoval = undefined;
    /**
    * @member {Array.<String>} cosignatories
    */
    cosignatories = undefined;
    /**
    * @member {Array.<String>} multisigAccounts
    */
    multisigAccounts = undefined;








}
