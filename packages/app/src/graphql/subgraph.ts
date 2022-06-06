import { gql } from 'urql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  readonly number_gte: Scalars['Int'];
};

export type Block_Height = {
  readonly hash?: InputMaybe<Scalars['Bytes']>;
  readonly number?: InputMaybe<Scalars['Int']>;
  readonly number_gte?: InputMaybe<Scalars['Int']>;
};

export type EditionPhoto = {
  readonly __typename?: 'EditionPhoto';
  readonly currentOwners: ReadonlyArray<Wallet>;
  readonly id: Scalars['ID'];
  readonly maxEditions: Scalars['BigInt'];
  readonly originalId: Scalars['BigInt'];
  readonly purchasedBy: ReadonlyArray<Wallet>;
  readonly totalPurchased: Scalars['BigInt'];
  readonly uri?: Maybe<Scalars['String']>;
};


export type EditionPhotoCurrentOwnersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Wallet_Filter>;
};


export type EditionPhotoPurchasedByArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Wallet_Filter>;
};

export type EditionPhoto_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly currentOwners?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly currentOwners_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly currentOwners_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly currentOwners_not?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly currentOwners_not_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly currentOwners_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly maxEditions?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_gt?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_gte?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly maxEditions_lt?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_lte?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_not?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly originalId?: InputMaybe<Scalars['BigInt']>;
  readonly originalId_gt?: InputMaybe<Scalars['BigInt']>;
  readonly originalId_gte?: InputMaybe<Scalars['BigInt']>;
  readonly originalId_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly originalId_lt?: InputMaybe<Scalars['BigInt']>;
  readonly originalId_lte?: InputMaybe<Scalars['BigInt']>;
  readonly originalId_not?: InputMaybe<Scalars['BigInt']>;
  readonly originalId_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly purchasedBy?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly purchasedBy_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly purchasedBy_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly purchasedBy_not?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly purchasedBy_not_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly purchasedBy_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly totalPurchased?: InputMaybe<Scalars['BigInt']>;
  readonly totalPurchased_gt?: InputMaybe<Scalars['BigInt']>;
  readonly totalPurchased_gte?: InputMaybe<Scalars['BigInt']>;
  readonly totalPurchased_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly totalPurchased_lt?: InputMaybe<Scalars['BigInt']>;
  readonly totalPurchased_lte?: InputMaybe<Scalars['BigInt']>;
  readonly totalPurchased_not?: InputMaybe<Scalars['BigInt']>;
  readonly totalPurchased_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly uri?: InputMaybe<Scalars['String']>;
  readonly uri_contains?: InputMaybe<Scalars['String']>;
  readonly uri_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_ends_with?: InputMaybe<Scalars['String']>;
  readonly uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_gt?: InputMaybe<Scalars['String']>;
  readonly uri_gte?: InputMaybe<Scalars['String']>;
  readonly uri_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly uri_lt?: InputMaybe<Scalars['String']>;
  readonly uri_lte?: InputMaybe<Scalars['String']>;
  readonly uri_not?: InputMaybe<Scalars['String']>;
  readonly uri_not_contains?: InputMaybe<Scalars['String']>;
  readonly uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly uri_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_starts_with?: InputMaybe<Scalars['String']>;
  readonly uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum EditionPhoto_OrderBy {
  CurrentOwners = 'currentOwners',
  Id = 'id',
  MaxEditions = 'maxEditions',
  OriginalId = 'originalId',
  PurchasedBy = 'purchasedBy',
  TotalPurchased = 'totalPurchased',
  Uri = 'uri'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OriginalPhoto = {
  readonly __typename?: 'OriginalPhoto';
  readonly currentOwner: Wallet;
  readonly editionId: Scalars['BigInt'];
  readonly id: Scalars['ID'];
  readonly purchasedAt: Scalars['BigInt'];
  readonly purchasedBy: Wallet;
  readonly uri?: Maybe<Scalars['String']>;
};

export type OriginalPhoto_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly currentOwner?: InputMaybe<Scalars['String']>;
  readonly currentOwner_contains?: InputMaybe<Scalars['String']>;
  readonly currentOwner_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly currentOwner_ends_with?: InputMaybe<Scalars['String']>;
  readonly currentOwner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly currentOwner_gt?: InputMaybe<Scalars['String']>;
  readonly currentOwner_gte?: InputMaybe<Scalars['String']>;
  readonly currentOwner_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly currentOwner_lt?: InputMaybe<Scalars['String']>;
  readonly currentOwner_lte?: InputMaybe<Scalars['String']>;
  readonly currentOwner_not?: InputMaybe<Scalars['String']>;
  readonly currentOwner_not_contains?: InputMaybe<Scalars['String']>;
  readonly currentOwner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly currentOwner_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly currentOwner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly currentOwner_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly currentOwner_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly currentOwner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly currentOwner_starts_with?: InputMaybe<Scalars['String']>;
  readonly currentOwner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly editionId?: InputMaybe<Scalars['BigInt']>;
  readonly editionId_gt?: InputMaybe<Scalars['BigInt']>;
  readonly editionId_gte?: InputMaybe<Scalars['BigInt']>;
  readonly editionId_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly editionId_lt?: InputMaybe<Scalars['BigInt']>;
  readonly editionId_lte?: InputMaybe<Scalars['BigInt']>;
  readonly editionId_not?: InputMaybe<Scalars['BigInt']>;
  readonly editionId_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly purchasedAt?: InputMaybe<Scalars['BigInt']>;
  readonly purchasedAt_gt?: InputMaybe<Scalars['BigInt']>;
  readonly purchasedAt_gte?: InputMaybe<Scalars['BigInt']>;
  readonly purchasedAt_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly purchasedAt_lt?: InputMaybe<Scalars['BigInt']>;
  readonly purchasedAt_lte?: InputMaybe<Scalars['BigInt']>;
  readonly purchasedAt_not?: InputMaybe<Scalars['BigInt']>;
  readonly purchasedAt_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly purchasedBy?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_contains?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_ends_with?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_gt?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_gte?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly purchasedBy_lt?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_lte?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_not?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_not_contains?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly purchasedBy_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_starts_with?: InputMaybe<Scalars['String']>;
  readonly purchasedBy_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly uri?: InputMaybe<Scalars['String']>;
  readonly uri_contains?: InputMaybe<Scalars['String']>;
  readonly uri_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_ends_with?: InputMaybe<Scalars['String']>;
  readonly uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_gt?: InputMaybe<Scalars['String']>;
  readonly uri_gte?: InputMaybe<Scalars['String']>;
  readonly uri_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly uri_lt?: InputMaybe<Scalars['String']>;
  readonly uri_lte?: InputMaybe<Scalars['String']>;
  readonly uri_not?: InputMaybe<Scalars['String']>;
  readonly uri_not_contains?: InputMaybe<Scalars['String']>;
  readonly uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly uri_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly uri_starts_with?: InputMaybe<Scalars['String']>;
  readonly uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum OriginalPhoto_OrderBy {
  CurrentOwner = 'currentOwner',
  EditionId = 'editionId',
  Id = 'id',
  PurchasedAt = 'purchasedAt',
  PurchasedBy = 'purchasedBy',
  Uri = 'uri'
}

export type Query = {
  readonly __typename?: 'Query';
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly editionPhoto?: Maybe<EditionPhoto>;
  readonly editionPhotos: ReadonlyArray<EditionPhoto>;
  readonly originalPhoto?: Maybe<OriginalPhoto>;
  readonly originalPhotos: ReadonlyArray<OriginalPhoto>;
  readonly settings: ReadonlyArray<Settings>;
  readonly wallet?: Maybe<Wallet>;
  readonly wallets: ReadonlyArray<Wallet>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryEditionPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEditionPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EditionPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EditionPhoto_Filter>;
};


export type QueryOriginalPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOriginalPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OriginalPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OriginalPhoto_Filter>;
};


export type QuerySettingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Settings_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Settings_Filter>;
};


export type QueryWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Settings = {
  readonly __typename?: 'Settings';
  readonly id: Scalars['ID'];
  readonly maxEditions: Scalars['BigInt'];
  readonly priceEdition: Scalars['BigInt'];
  readonly priceOriginal: Scalars['BigInt'];
};

export type Settings_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly maxEditions?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_gt?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_gte?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly maxEditions_lt?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_lte?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_not?: InputMaybe<Scalars['BigInt']>;
  readonly maxEditions_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly priceEdition?: InputMaybe<Scalars['BigInt']>;
  readonly priceEdition_gt?: InputMaybe<Scalars['BigInt']>;
  readonly priceEdition_gte?: InputMaybe<Scalars['BigInt']>;
  readonly priceEdition_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly priceEdition_lt?: InputMaybe<Scalars['BigInt']>;
  readonly priceEdition_lte?: InputMaybe<Scalars['BigInt']>;
  readonly priceEdition_not?: InputMaybe<Scalars['BigInt']>;
  readonly priceEdition_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly priceOriginal?: InputMaybe<Scalars['BigInt']>;
  readonly priceOriginal_gt?: InputMaybe<Scalars['BigInt']>;
  readonly priceOriginal_gte?: InputMaybe<Scalars['BigInt']>;
  readonly priceOriginal_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly priceOriginal_lt?: InputMaybe<Scalars['BigInt']>;
  readonly priceOriginal_lte?: InputMaybe<Scalars['BigInt']>;
  readonly priceOriginal_not?: InputMaybe<Scalars['BigInt']>;
  readonly priceOriginal_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
};

export enum Settings_OrderBy {
  Id = 'id',
  MaxEditions = 'maxEditions',
  PriceEdition = 'priceEdition',
  PriceOriginal = 'priceOriginal'
}

export type Subscription = {
  readonly __typename?: 'Subscription';
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly editionPhoto?: Maybe<EditionPhoto>;
  readonly editionPhotos: ReadonlyArray<EditionPhoto>;
  readonly originalPhoto?: Maybe<OriginalPhoto>;
  readonly originalPhotos: ReadonlyArray<OriginalPhoto>;
  readonly settings: ReadonlyArray<Settings>;
  readonly wallet?: Maybe<Wallet>;
  readonly wallets: ReadonlyArray<Wallet>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionEditionPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEditionPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EditionPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EditionPhoto_Filter>;
};


export type SubscriptionOriginalPhotoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOriginalPhotosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OriginalPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OriginalPhoto_Filter>;
};


export type SubscriptionSettingsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Settings_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Settings_Filter>;
};


export type SubscriptionWalletArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWalletsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Wallet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Wallet_Filter>;
};

export type Wallet = {
  readonly __typename?: 'Wallet';
  readonly address: Scalars['Bytes'];
  readonly editions: ReadonlyArray<EditionPhoto>;
  readonly id: Scalars['ID'];
  readonly originals: ReadonlyArray<OriginalPhoto>;
};


export type WalletEditionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EditionPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EditionPhoto_Filter>;
};


export type WalletOriginalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OriginalPhoto_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OriginalPhoto_Filter>;
};

export type Wallet_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly address?: InputMaybe<Scalars['Bytes']>;
  readonly address_contains?: InputMaybe<Scalars['Bytes']>;
  readonly address_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly address_not?: InputMaybe<Scalars['Bytes']>;
  readonly address_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly address_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
};

export enum Wallet_OrderBy {
  Address = 'address',
  Editions = 'editions',
  Id = 'id',
  Originals = 'originals'
}

export type _Block_ = {
  readonly __typename?: '_Block_';
  /** The hash of the block */
  readonly hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  readonly number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  readonly __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  readonly block: _Block_;
  /** The deployment ID */
  readonly deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  readonly hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type PhotoByIdQueryVariables = Exact<{
  originalId: Scalars['ID'];
  editionId: Scalars['ID'];
}>;


export type PhotoByIdQuery = { readonly __typename?: 'Query', readonly originalPhoto?: { readonly __typename?: 'OriginalPhoto', readonly id: string, readonly currentOwner: { readonly __typename?: 'Wallet', readonly address: any } } | null, readonly editionPhoto?: { readonly __typename?: 'EditionPhoto', readonly id: string, readonly totalPurchased: any, readonly currentOwners: ReadonlyArray<{ readonly __typename?: 'Wallet', readonly address: any }> } | null };


export const PhotoByIdDocument = gql`
    query PhotoById($originalId: ID!, $editionId: ID!) {
  originalPhoto(id: $originalId) {
    id
    currentOwner {
      address
    }
  }
  editionPhoto(id: $editionId) {
    id
    totalPurchased
    currentOwners {
      address
    }
  }
}
    `;

export function usePhotoByIdQuery(options: Omit<Urql.UseQueryArgs<PhotoByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<PhotoByIdQuery>({ query: PhotoByIdDocument, ...options });
};