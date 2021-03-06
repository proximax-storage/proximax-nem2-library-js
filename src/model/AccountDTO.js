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
import MosaicDTO from './MosaicDTO';
import UInt64DTO from './UInt64DTO';





/**
* The AccountDTO model module.
* @module model/AccountDTO
* @version 1.0.13
*/
export default class AccountDTO {
    /**
    * Constructs a new <code>AccountDTO</code>.
    * @alias module:model/AccountDTO
    * @class
    * @param address {String} 
    * @param addressHeight {module:model/UInt64DTO} 
    * @param publicKey {String} 
    * @param publicKeyHeight {module:model/UInt64DTO} 
    * @param accountType {Number} 
    * @param linkedAccountKey {String} 
    * @param mosaics {Array.<module:model/MosaicDTO>} 
    */

    constructor(address, addressHeight, publicKey, publicKeyHeight, accountType, linkedAccountKey, mosaics) {
        

        
        

        this['address'] = address;this['addressHeight'] = addressHeight;this['publicKey'] = publicKey;this['publicKeyHeight'] = publicKeyHeight;this['accountType'] = accountType;this['linkedAccountKey'] = linkedAccountKey;this['mosaics'] = mosaics;

        
    }

    /**
    * Constructs a <code>AccountDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/AccountDTO} obj Optional instance to populate.
    * @return {module:model/AccountDTO} The populated <code>AccountDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AccountDTO();

            
            
            

            if (data.hasOwnProperty('address')) {
                obj['address'] = ApiClient.convertToType(data['address'], 'String');
            }
            if (data.hasOwnProperty('addressHeight')) {
                obj['addressHeight'] = UInt64DTO.constructFromObject(data['addressHeight']);
            }
            if (data.hasOwnProperty('publicKey')) {
                obj['publicKey'] = ApiClient.convertToType(data['publicKey'], 'String');
            }
            if (data.hasOwnProperty('publicKeyHeight')) {
                obj['publicKeyHeight'] = UInt64DTO.constructFromObject(data['publicKeyHeight']);
            }
            if (data.hasOwnProperty('accountType')) {
                obj['accountType'] = ApiClient.convertToType(data['accountType'], 'Number');
            }
            if (data.hasOwnProperty('linkedAccountKey')) {
                obj['linkedAccountKey'] = ApiClient.convertToType(data['linkedAccountKey'], 'String');
            }
            if (data.hasOwnProperty('mosaics')) {
                obj['mosaics'] = ApiClient.convertToType(data['mosaics'], [MosaicDTO]);
            }
        }
        return obj;
    }

    /**
    * @member {String} address
    */
    address = undefined;
    /**
    * @member {module:model/UInt64DTO} addressHeight
    */
    addressHeight = undefined;
    /**
    * @member {String} publicKey
    */
    publicKey = undefined;
    /**
    * @member {module:model/UInt64DTO} publicKeyHeight
    */
    publicKeyHeight = undefined;
    /**
    * @member {Number} accountType
    */
    accountType = undefined;
    /**
    * @member {String} linkedAccountKey
    */
    linkedAccountKey = undefined;
    /**
    * @member {Array.<module:model/MosaicDTO>} mosaics
    */
    mosaics = undefined;








}
