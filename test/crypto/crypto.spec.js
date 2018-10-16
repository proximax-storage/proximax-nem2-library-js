/*
 * Copyright 2018 NEM
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

import { expect } from 'chai';
import convert from '../../src/coders/convert';
import { createKeyPairFromPrivateKeyString } from '../../src/crypto/keyPair';
import Crypto from '../../src/crypto/crypto';
import CryptoJS from 'crypto-js';

describe('crypto tests', function() {

	it("Can derive a key from password and count", function() {
		// Arrange:
		let password = "TestTest";
		let count = 20;
		let expectedKey = "8cd87bc513857a7079d182a6e19b370e907107d97bd3f81a85bcebcc4b5bd3b5";

		// Act:
		let result = Crypto.derivePassSha(password, count);

		// Assert:
		expect(result.priv).equal(expectedKey);
	});

	it("Can encrypt a private key", function() {
		// Arrange:
		let password = "TestTest";
		let privateKey = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";
		let expectedKey = "8cd87bc513857a7079d182a6e19b370e907107d97bd3f81a85bcebcc4b5bd3b5";

		// Act:
		let result = Crypto.encodePrivKey(privateKey, password);
		let pass = Crypto.derivePassSha(password, 20);
		let obj = {
			ciphertext: CryptoJS.enc.Hex.parse(result.ciphertext),
			iv: convert.hexToUint8(result.iv),
			key: convert.hexToUint8(pass.priv)
		}

		// Assert:
		expect(pass.priv).equal(expectedKey);
		expect(result.iv.length).equal(16 * 2);
		expect(result.ciphertext.length).equal(48 * 2);
	});

	it("Can decrypt a private key", function() {
		// Arrange:
		let password = "TestTest";
		let expectedPrivateKey = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";
		let key = "8cd87bc513857a7079d182a6e19b370e907107d97bd3f81a85bcebcc4b5bd3b5";
		let encrypted = "c09ef3ed0cadd6ca6d3638b5dd854ac871a0afaec6b7fed791166b571a64d57f564376dc0180c851b0a1120b5896e6a0";
		let iv = "0329814121c7a4bb11418084dbe40560";
		let obj = {
			ciphertext: CryptoJS.enc.Hex.parse(encrypted),
			iv: convert.hexToUint8(iv),
			key: convert.hexToUint8(key)
		}

		// Act:
		let decrypted = Crypto.decrypt(obj);

		// Assert:
		expect(decrypted).equal(expectedPrivateKey);
	});

	it("Can encrypt and decrypt private Key", function() {
		// Arrange:
		let password = "TestTest";
		let privateKey = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";

		// Act:
		let result = Crypto.encodePrivKey(privateKey, password);
		let pass = Crypto.derivePassSha(password, 20);
		let obj = {
			ciphertext: CryptoJS.enc.Hex.parse(result.ciphertext),
			iv: convert.hexToUint8(result.iv),
			key: convert.hexToUint8(pass.priv)
		}
		let decrypted = Crypto.decrypt(obj);

		// Assert:
		expect(privateKey).equal(decrypted);
	});

	describe('Encrypt private key edge-cases', function() {

		it("Encryption throw error if no password", function() {
			// Arrange:
			let password = "";
			let privateKey = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";

			// Act:
			let result = Crypto.encodePrivKey.bind(null, privateKey, password);

			// Assert:
			expect(result).to.throw('Missing argument !');
		});

		it("Encryption throw error if no private key", function() {
			// Arrange:
			let password = "TestTest";
			let privateKey = "";

			// Act
			let result = Crypto.encodePrivKey.bind(null, privateKey, password);

			// Assert:
			expect(result).to.throw('Missing argument !');
		});

	});

	it("Can decrypt private key of pass:enc wallets", function() {
		// Arrange:
		let common = {
			'password': 'TestTest',
			'privateKey': ''
		}
		let walletAccount = {
			"encrypted": "2e1717f245b7e1138b0dfe99dfce65b16b1c9d8ca03a9f90b86b43677b6337ce56ec474c64f73244790eb2490ad14752",
			"iv": "dccffaa4883cda85d6b06714aabe6ec6",
		}
		let mainAlgo = "pass:enc";
		let expectedPrivateKey = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";

		// Act:
		let result = Crypto.passwordToPrivatekey(common, walletAccount, mainAlgo);

		// Assert:
		expect(result).equal(true);
		expect(common.privateKey).equal(expectedPrivateKey);
	});

	it("Can decrypt private key of pass:bip32 wallets", function() {
		// Arrange:
		let common = {
			'password': 'TestTest',
			'privateKey': ''
		}
		let walletAccount = {
			"encrypted": "2e1717f245b7e1138b0dfe99dfce65b16b1c9d8ca03a9f90b86b43677b6337ce56ec474c64f73244790eb2490ad14752",
			"iv": "dccffaa4883cda85d6b06714aabe6ec6",
		}
		let mainAlgo = "pass:bip32";
		let expectedPrivateKey = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";

		// Act:
		let result = Crypto.passwordToPrivatekey(common, walletAccount, mainAlgo);

		// Assert:
		expect(result).equal(true);
		expect(common.privateKey).equal(expectedPrivateKey);
	});

	it("Can decrypt private key of pass:6k wallets", function() {
		// Arrange:
		let common = {
			'password': 'TestTest',
			'privateKey': ''
		}
		let walletAccount = {
			"encrypted": "",
			"iv": ""
		}
		let mainAlgo = "pass:6k";
		let expectedPrivateKey = "8fac70ea9aca3ae3418e25c0d31d9a0723e0a1790ae8fa97747c00dc0037472e";

		// Act:
		let result = Crypto.passwordToPrivatekey(common, walletAccount, mainAlgo);

		// Assert:
		expect(result).equal(true);
		expect(common.privateKey).equal(expectedPrivateKey);
	});

	it("Can decrypt private key of pass:6k wallets childs", function() {
		// Arrange:
		let common = {
			'password': 'TestTest',
			'privateKey': ''
		}
		let walletAccount = {
			"encrypted": "5c3a7ebbefb391e5175a29ec5a22cb162cd590bb2e0b09416273f86bdc39fa83c04c4bb53b9c64fd1e6eaba5dba149bd",
			"iv": "f131d9a4dfb1b0b696e05ccae9412e8f"
		}
		let mainAlgo = "pass:6k";
		let expectedPrivateKey = "4f27ca43521bbc394a6f6dde65b533e0768f954fa47ce320b0e9f4b5fe450f9d";

		// Act:
		let result = Crypto.passwordToPrivatekey(common, walletAccount, mainAlgo);

		// Assert:
		expect(result).equal(true);
		expect(common.privateKey).equal(expectedPrivateKey);
	});

	describe('Decrypt private key edge-cases', function() {

		it("Private key decryption throw error if no algo", function() {
			// Arrange:
			let common = {
				'password': 'TestTest',
				'privateKey': ''
			}
			let walletAccount = {
				"encrypted": "2e1717f245b7e1138b0dfe99dfce65b16b1c9d8ca03a9f90b86b43677b6337ce56ec474c64f73244790eb2490ad14752",
				"iv": "dccffaa4883cda85d6b06714aabe6ec6",
			}
			let mainAlgo = "";
			let expectedPrivateKey = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";

			// Act:
			let result = Crypto.passwordToPrivatekey.bind(null, common, walletAccount, mainAlgo);

			// Assert:
			expect(result).to.throw('Missing argument !');
		});

		it("Decryption of pass:enc wallets thow error if no password", function() {
			// Arrange:
			let common = {
				'password': '',
				'privateKey': ''
			}
			let walletAccount = {
				"encrypted": "2e1717f245b7e1138b0dfe99dfce65b16b1c9d8ca03a9f90b86b43677b6337ce56ec474c64f73244790eb2490ad14752",
				"iv": "dccffaa4883cda85d6b06714aabe6ec6",
			}
			let mainAlgo = "pass:enc";

			// Act:
			let result = Crypto.passwordToPrivatekey.bind(null, common, walletAccount, mainAlgo);

			// Assert:
			expect(result).to.throw('Missing argument !');
		});

		it("Decryption of pass:bip32 wallets throw error if no password", function() {
			// Arrange:
			let common = {
				'password': '',
				'privateKey': ''
			}
			let walletAccount = {
				"encrypted": "2e1717f245b7e1138b0dfe99dfce65b16b1c9d8ca03a9f90b86b43677b6337ce56ec474c64f73244790eb2490ad14752",
				"iv": "dccffaa4883cda85d6b06714aabe6ec6",
			}
			let mainAlgo = "pass:bip32";

			// Act:
			let result = Crypto.passwordToPrivatekey.bind(null, common, walletAccount, mainAlgo);

			// Assert:
			expect(result).to.throw('Missing argument !');
		});

		it("Decryption of pass:6k wallets throw error if no password", function() {
			// Arrange:
			let common = {
				'password': '',
				'privateKey': ''
			}
			let walletAccount = {
				"encrypted": "2e1717f245b7e1138b0dfe99dfce65b16b1c9d8ca03a9f90b86b43677b6337ce56ec474c64f73244790eb2490ad14752",
				"iv": "dccffaa4883cda85d6b06714aabe6ec6",
			}
			let mainAlgo = "pass:6k";

			// Act:
			let result = Crypto.passwordToPrivatekey.bind(null, common, walletAccount, mainAlgo);

			// Assert:
			expect(result).to.throw('Missing argument !');
		});

		it("Decryption of pass:6k wallets generate a private key if no encrypted and iv in wallet account", function() {
			// Arrange:
			let common = {
				'password': 'TestTest',
				'privateKey': ''
			}
			let walletAccount = {
				"encrypted": "",
				"iv": "",
			}
			let mainAlgo = "pass:6k";
			let expectedPrivateKey = "8fac70ea9aca3ae3418e25c0d31d9a0723e0a1790ae8fa97747c00dc0037472e";

			// Act:
			let result = Crypto.passwordToPrivatekey(common, walletAccount, mainAlgo);

			// Assert:
			expect(result).equal(true);
			expect(common.privateKey).equal(expectedPrivateKey);
		});

		it("Decryption of pass:6k wallets return false if encrypted data but no iv", function() {
			// Arrange:
			let common = {
				'password': 'TestTest',
				'privateKey': ''
			}
			let walletAccount = {
				"encrypted": "2e1717f245b7e1138b0dfe99dfce65b16b1c9d8ca03a9f90b86b43677b6337ce56ec474c64f73244790eb2490ad14752",
				"iv": "",
			}
			let mainAlgo = "pass:6k";

			// Act:
			let result = Crypto.passwordToPrivatekey(common, walletAccount, mainAlgo);

			// Assert:
			expect(result).equal(false);
			expect(common.privateKey).equal("");
		});

		it("Decryption of pass:6k wallets return false if no encrypted data but iv", function() {
			// Arrange:
			let common = {
				'password': 'TestTest',
				'privateKey': ''
			}
			let walletAccount = {
				"encrypted": "",
				"iv": "dccffaa4883cda85d6b06714aabe6ec6",
			}
			let mainAlgo = "pass:6k";

			// Act:
			let result = Crypto.passwordToPrivatekey(common, walletAccount, mainAlgo);

			// Assert:
			expect(result).equal(false);
			expect(common.privateKey).equal("");
		});

	});

    /*it("Can encode message with sender private key", function() {
        // Arrange:
        let senderPriv = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";
        let recipientPublic = "5aae0b521c59cfc8c2114dc74d2f652359a68e377657c3f6bd6091f16f72e1ec";
        let message = "NEM is awesome !";
        let iv = "f396cf605ee7cb0e7618df82aa48c684";
        let salt = "5f8d37e8116b6dc9171ffeb7617b0988bfd8abe0e611c2c34cc127b637d8192a";
        let expectedHex = "5f8d37e8116b6dc9171ffeb7617b0988bfd8abe0e611c2c34cc127b637d8192af396cf605ee7cb0e7618df82aa48c684eb60d26923a2672758f7df7b1430a026e88fea1f4bb3171ab213a5679b9fb9d9";

        // Act:
        let encryptedHex = Crypto._encode(senderPriv, recipientPublic, message, convert.hexToUint8(iv), convert.hexToUint8(salt));

        // Assert:
        expect(encryptedHex).equal(expectedHex);
	});*/

	it('Can encode decode data with sender private key and recipient public key', () => {
	  // Arrange:
		const senderPriv = '2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90';
		const recipientPriv = '2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9';
		const recipient = createKeyPairFromPrivateKeyString(recipientPriv);

		const expectedMsg = 'NEM is awesome !';
		const msgBuffer = Buffer.from(expectedMsg);
		const msgBytes = new Uint8Array(msgBuffer);

		// Act:
		const encrypted = Crypto.nemencrypt(senderPriv, convert.uint8ToHex(recipient.publicKey), msgBytes);
		const decrypted = Crypto.nemdecrypt(senderPriv, convert.uint8ToHex(recipient.publicKey), encrypted);

		const secureMsg = convert.ab2str(encrypted);
		const plainMsg = convert.ab2str(decrypted);

		// Assert:
		expect(secureMsg).not.equal(expectedMsg);
		expect(plainMsg).equal(expectedMsg);
	});

	it('Can encode decode data with receiver private key and sender public key', () => {
		// Arrange:
		const senderPriv = '2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90';
		const sender = createKeyPairFromPrivateKeyString(senderPriv);
		const recipientPriv = '2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9';
		const recipient = createKeyPairFromPrivateKeyString(recipientPriv);

		const expectedMsg = 'NEM is awesome !';
		const msgBuffer = Buffer.from(expectedMsg);
		const msgBytes = new Uint8Array(msgBuffer);
		// console.log('Input bytes ' + arrayMessage);

		// Act:
		const encrypted = Crypto.nemencrypt(senderPriv, convert.uint8ToHex(recipient.publicKey), msgBytes);
		const decrypted = Crypto.nemdecrypt(recipientPriv, convert.uint8ToHex(sender.publicKey), encrypted);

		const secureMsg = convert.ab2str(encrypted);
		const plainMsg = convert.ab2str(decrypted);

		// Assert:
		expect(secureMsg).not.equal(expectedMsg);
		expect(plainMsg).equal(expectedMsg);
	});

	it('Error when decoding with different private key', () => {
		// Arrange:
		const senderPriv = '2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90';
		const sender = createKeyPairFromPrivateKeyString(senderPriv);
		const recipientPriv = '2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9';
		const recipient = createKeyPairFromPrivateKeyString(recipientPriv);
		const otherPriv = 'd19edbf7c5f4665bbb168f8bff3dc1ca85766080b10aabd60dde5d6d7e893d5b';

		const msg = 'NEM is awesome !';
		const msgBuffer = Buffer.from(msg);
		const msgBytes = new Uint8Array(msgBuffer);

		// Act:
		const encrypted = Crypto.nemencrypt(senderPriv, convert.uint8ToHex(recipient.publicKey), msgBytes);
		const decryptedMsg = () => {
			const decrypted = Crypto.nemdecrypt(otherPriv, convert.uint8ToHex(sender.publicKey), encrypted);
			return convert.ab2str(decrypted);
		};

		// Assert:
		expect(decryptedMsg).to.satisfy(decrypted => decrypted === Error || decrypted !== msg);
	});

	it('Error when decoding with different public key', () => {
		// Arrange:
		const senderPriv = '2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90';
		const recipientPriv = '2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9';
		const recipient = createKeyPairFromPrivateKeyString(recipientPriv);
		const otherPriv = 'd19edbf7c5f4665bbb168f8bff3dc1ca85766080b10aabd60dde5d6d7e893d5b';
		const other = createKeyPairFromPrivateKeyString(otherPriv);

		const msg = 'NEM is awesome !';
		const msgBuffer = Buffer.from(msg);
		const msgBytes = new Uint8Array(msgBuffer);

		// Act:
		const encrypted = Crypto.nemencrypt(senderPriv, convert.uint8ToHex(recipient.publicKey), msgBytes);
		const decryptedMsg = () => {
			const decrypted = Crypto.nemdecrypt(senderPriv, convert.uint8ToHex(other.publicKey), encrypted);
			return convert.ab2str(decrypted);
		};

		// Assert:
	  	expect(decryptedMsg).to.satisfy(decrypted => decrypted === Error || decrypted !== msg);
	});

/*
    it("Can decode message with recipient private key", function() {
        // Arrange:
        let senderPublic = "9291abb3c52134be9d20ef21a796743497df7776d2661237bda9cadade34e44c";
        let recipientPriv = "2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9";
        let expectedMessage = "NEM is awesome !";
        let encryptedMessage = "dd31d6b4111c1023bae6533399e74f73a29c6e6b48ab550f8a7bea127e27dddb4fd3fe4fad3c835307c0da52d9c268f56237d1810e07912e6a6568cba09d9a9176ee6b1ade9569c2e1e273e9675bd4ff";

        // Act:
        let decrypted = {
            'type': 1,
            'payload': Crypto.decode(recipientPriv, senderPublic, encryptedMessage)
        };
        let decryptedMessage = convert.utf8ToHex(decrypted);

        // Assert:
        expect(decryptedMessage).equal(expectedMessage);
    });

    it("Roundtrip decode encode", function() {
        // Arrange:
        let senderPriv = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";
        let sender = KeyPair.create(senderPriv);
        let recipientPriv = "2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9";
        let recipient = KeyPair.create(recipientPriv);
        let message = "NEM is awesome !";
        let encryptedMessage = "dd31d6b4111c1023bae6533399e74f73a29c6e6b48ab550f8a7bea127e27dddb4fd3fe4fad3c835307c0da52d9c268f56237d1810e07912e6a6568cba09d9a9176ee6b1ade9569c2e1e273e9675bd4ff";

        // Act:
        let decrypted = {
            'type': 1,
            'payload': Crypto.decode(recipientPriv, sender.publicKey.toString(), encryptedMessage)
        };
        let decryptedMessage = convert.utf8ToHex(decrypted);

        let encrypted = Crypto.encode(recipientPriv, sender.publicKey.toString(), decryptedMessage);

        // Assert:
        expect(decryptedMessage).equal(message);
        expect(encrypted.length).equal(80 * 2);
    });

    it("Roundtrip encode decode", function() {
        // Arrange:
        let senderPriv = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";
        let sender = KeyPair.create(senderPriv);
        let recipientPriv = "2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9";
        let recipient = KeyPair.create(recipientPriv);
        let message = "NEM is awesome !";

        // Act:
        let encrypted = Crypto.encode(senderPriv, recipient.publicKey.toString(), message);
        let decrypted = {
            'type': 1,
            'payload': Crypto.decode(recipientPriv, sender.publicKey.toString(), encrypted)
        };
        let decryptedMessage = convert.utf8ToHex(decrypted);

        // Assert:
        expect(decryptedMessage).equal(message);
    });
*/
	describe('Encode & decode message edge-cases', function() {

		it("Message encoding throw error if no sender private key", function() {
			// Arrange:
			let senderPriv = "";
			let recipientPublic = "2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9";
			let message = "NEM is awesome !";

			// Act:
			let result = Crypto.encode.bind(null, senderPriv, recipientPublic, message);

			// Assert:
			expect(result).to.throw();
		});

		it("Message encoding throw error if no recipient public key", function() {
			// Arrange:
			let senderPriv = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";
			let recipientPublic = "";
			let message = "NEM is awesome !";

			// Act:
			let result = Crypto.encode.bind(null, senderPriv, recipientPublic, message);

			// Assert:
			expect(result).to.throw();
		});

		it("Message encoding throw error if no message", function() {
			// Arrange:
			let senderPriv = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";
			let recipientPublic = "2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9";
			let message = "";

			// Act:
			let result = Crypto.encode.bind(null, senderPriv, recipientPublic, message);

			// Assert:
			expect(result).to.throw();
		});


		it("Message decoding throw error if no recipient private key", function() {
			// Arrange:
			let senderPublic = "9291abb3c52134be9d20ef21a796743497df7776d2661237bda9cadade34e44c";
			let recipientPriv = "";
			let message = "NEM is awesome !";
			let encryptedMessage = "dd31d6b4111c1023bae6533399e74f73a29c6e6b48ab550f8a7bea127e27dddb4fd3fe4fad3c835307c0da52d9c268f56237d1810e07912e6a6568cba09d9a9176ee6b1ade9569c2e1e273e9675bd4ff";

			// Act:
			let result = Crypto.decode.bind(null, recipientPriv, senderPublic, encryptedMessage);

			// Assert:
			expect(result).to.throw();
		});

		it("Message decoding throw error if no sender public key", function() {
			// Arrange:
			let senderPublic = "";
			let recipientPriv = "2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9";
			let message = "NEM is awesome !";
			let encryptedMessage = "dd31d6b4111c1023bae6533399e74f73a29c6e6b48ab550f8a7bea127e27dddb4fd3fe4fad3c835307c0da52d9c268f56237d1810e07912e6a6568cba09d9a9176ee6b1ade9569c2e1e273e9675bd4ff";

			// Act:
			let result = Crypto.decode.bind(null, recipientPriv, senderPublic, encryptedMessage);

			// Assert:
			expect(result).to.throw();
		});


		it("Message decoding throw error if no payload", function() {
			// Arrange:
			let senderPublic = "9291abb3c52134be9d20ef21a796743497df7776d2661237bda9cadade34e44c";
			let recipientPriv = "2618090794e9c9682f2ac6504369a2f4fb9fe7ee7746f9560aca228d355b1cb9";
			let message = "NEM is awesome !";
			let encryptedMessage = "";

			// Act:
			let result = Crypto.decode.bind(null, recipientPriv, senderPublic, encryptedMessage)

			// Assert:
			expect(result).to.throw();
		});

	});

	it("Can encrypt and decrypt private key for mobile", function() {
		// Arrange:
		let privateKey = "2a91e1d5c110a8d0105aad4683f962c2a56663a3cad46666b16d243174673d90";
		let password = "TestTest";

		// Act:
		let result = Crypto.toMobileKey(password, privateKey);
		let encrypted = result.encrypted;
		let salt = CryptoJS.enc.Hex.parse(result.salt);

		let key = CryptoJS.PBKDF2(password, salt, {
			keySize: 256 / 32,
			iterations: 2000
		});

		let iv = encrypted.substring(0, 32);
		let encryptedPrvKey = encrypted.substring(32, 128);

		let obj = {
			ciphertext: CryptoJS.enc.Hex.parse(encryptedPrvKey),
			iv: convert.hexToUint8(iv),
			key: convert.hexToUint8(key.toString())
		}

		let decrypted = Crypto.decrypt(obj);

		// Assert:
		expect(encrypted.length).equal(128);
		expect(salt.toString().length).equal(32 * 2);
		expect(decrypted).equal(privateKey);
	});
});
