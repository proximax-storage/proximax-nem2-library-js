// Copyright 2019 ProximaX Limited. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file

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


import ApiClient from "../ApiClient";
import Addresses from '../model/Addresses';
import ContractInfoDTO from '../model/ContractInfoDTO';
import PublicKeys from '../model/PublicKeys';

/**
* ContractRoutes service.
* @module api/ContractRoutesApi
* @version 1.0.13
*/
export default class ContractRoutesApi {

    /**
    * Constructs a new ContractRoutesApi. 
    * @alias module:api/ContractRoutesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Get contract of account
     * Gets the contract for a given publicKey.
     * @param {String} publicKey The account identifier.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/ContractInfoDTO} and HTTP response
     */
    getAccountContractWithHttpInfo(publicKey) {
      let postBody = null;

      // verify the required parameter 'publicKey' is set
      if (publicKey === undefined || publicKey === null) {
        throw new Error("Missing the required parameter 'publicKey' when calling getAccountContract");
      }


      let pathParams = {
        'publicKey': publicKey
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = ContractInfoDTO;

      return this.apiClient.callApi(
        '/account/{publicKey}/contracts', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Get contract of account
     * Gets the contract for a given publicKey.
     * @param {String} publicKey The account identifier.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/ContractInfoDTO}
     */
    getAccountContract(publicKey) {
      return this.getAccountContractWithHttpInfo(publicKey)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Get contracts for an array of publicKeys
     * Gets an array of contracts.
     * @param {module:model/PublicKeys} publicKeys An array of public keys.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/ContractInfoDTO>} and HTTP response
     */
    getAccountContractsWithHttpInfo(publicKeys) {
      let postBody = publicKeys;

      // verify the required parameter 'publicKeys' is set
      if (publicKeys === undefined || publicKeys === null) {
        throw new Error("Missing the required parameter 'publicKeys' when calling getAccountContracts");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [ContractInfoDTO];

      return this.apiClient.callApi(
        '/account/contracts', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Get contracts for an array of publicKeys
     * Gets an array of contracts.
     * @param {module:model/PublicKeys} publicKeys An array of public keys.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/ContractInfoDTO>}
     */
    getAccountContracts(publicKeys) {
      return this.getAccountContractsWithHttpInfo(publicKeys)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Get contract of account
     * Gets the contract for a given accountId.
     * @param {String} accountId The account identifier.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/ContractInfoDTO} and HTTP response
     */
    getContractWithHttpInfo(accountId) {
      let postBody = null;

      // verify the required parameter 'accountId' is set
      if (accountId === undefined || accountId === null) {
        throw new Error("Missing the required parameter 'accountId' when calling getContract");
      }


      let pathParams = {
        'accountId': accountId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = ContractInfoDTO;

      return this.apiClient.callApi(
        '/contract/{accountId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Get contract of account
     * Gets the contract for a given accountId.
     * @param {String} accountId The account identifier.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/ContractInfoDTO}
     */
    getContract(accountId) {
      return this.getContractWithHttpInfo(accountId)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Get contracts for an array of publicKeys or addresses
     * Gets an array of contracts.
     * @param {module:model/Addresses} addresses An array of addresses.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/ContractInfoDTO>} and HTTP response
     */
    getContractsWithHttpInfo(addresses) {
      let postBody = addresses;

      // verify the required parameter 'addresses' is set
      if (addresses === undefined || addresses === null) {
        throw new Error("Missing the required parameter 'addresses' when calling getContracts");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [ContractInfoDTO];

      return this.apiClient.callApi(
        '/contract', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Get contracts for an array of publicKeys or addresses
     * Gets an array of contracts.
     * @param {module:model/Addresses} addresses An array of addresses.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/ContractInfoDTO>}
     */
    getContracts(addresses) {
      return this.getContractsWithHttpInfo(addresses)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
