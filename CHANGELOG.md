# Proximax CHANGELOG

## v0.3.0

- renamed to js-xpx-chain-library

## v0.2.0

- fix cross-sdk message encrypt/decrypt

## v0.1.0

- Initial Proximax version
- renamed to js-xpx-catapult-library
- reset versioning
- Cow compatible
- Support for metadata added

# NEM CHANGELOG

## v0.9.16

- Version fix

## v0.9.15

- Fixed message encryption to use sha3
- Added signTransactionGivenSignatures

## v0.9.14

- Fixed MosaicDefinition schema, added `schemaNoDuration` for optional duration
- Fixed MosaicDefinition buffer to use new schemas
- Added `crypto_shared_key_hash` in nacl_catapult.js
- Update DTOs for NamespaceMetaId and MosaicMetaId

## v0.9.13

- Exposing serialization method for unsigned transactions
- Needed to deploy PR nemtech/nem2-sdk-typescript-javascript#86

## v0.9.12

- Added AccountLinkTransaction
- Added TransferTransaction.recipient NamespaceId capability
- Fixed MosaicService, MosaicAmountView, MosaicView
- Fixed AddressAliasTransaction.type default value

## v0.9.11

- Added transaction type AccountPropertiesAddressTransaction (nemtech/nem2-sdk-typescript-javascript#50)
- Added transaction type AccountPropertiesEntityTypeTransaction (nemtech/nem2-sdk-typescript-javascript#50)
- Added transaction type AccountPropertiesMosaicTransaction (nemtech/nem2-sdk-typescript-javascript#50)
- Fixed SecretLockTransaction and SecretProofTransaction buffer size
- Fixed Alias DTO for mosaicId type
- Fixed websocket responses for rename of fee field

## v0.9.10

- updated buffers AccountProperties

## v0.9.9

- Not documented

## v0.9.8

- Fixed AliasDTO type problem with field `mosaicId`, now `UInt64`

## v0.9.7

- Added AddressAliasTransaction + schema + buffer
- Added MosaicAliasTransaction + schema + buffer

## v0.9.6

- Fixed DTO compatibility for catapult-server@0.3.0.1 (cow) Network Upgrade

## v0.9.5-2

- Alpace Compatibility

