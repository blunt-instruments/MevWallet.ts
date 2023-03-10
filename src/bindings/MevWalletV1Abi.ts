/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface MevWalletV1AbiInterface extends utils.Interface {
  functions: {
    "TX_TYPEHASH()": FunctionFragment;
    "_DOMAIN_SEPARATOR()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "mevTx(address,bytes,int256,bool,int256,uint256,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "nonce()": FunctionFragment;
    "owner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "TX_TYPEHASH"
      | "_DOMAIN_SEPARATOR"
      | "initialize"
      | "mevTx"
      | "nonce"
      | "owner"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "TX_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_DOMAIN_SEPARATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "mevTx",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "TX_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_DOMAIN_SEPARATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mevTx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "Executed(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Executed"): EventFragment;
}

export interface ExecutedEventObject {
  nonce: BigNumber;
}
export type ExecutedEvent = TypedEvent<[BigNumber], ExecutedEventObject>;

export type ExecutedEventFilter = TypedEventFilter<ExecutedEvent>;

export interface MevWalletV1Abi extends BaseContract {
  contractName: "MevWalletV1Abi";

  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MevWalletV1AbiInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    TX_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    _DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mevTx(
      to: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      delegate: PromiseOrValue<boolean>,
      tip: PromiseOrValue<BigNumberish>,
      maxBaseFee: PromiseOrValue<BigNumberish>,
      timing: PromiseOrValue<BigNumberish>,
      n: PromiseOrValue<BigNumberish>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    nonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  TX_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  _DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

  initialize(
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mevTx(
    to: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    value: PromiseOrValue<BigNumberish>,
    delegate: PromiseOrValue<boolean>,
    tip: PromiseOrValue<BigNumberish>,
    maxBaseFee: PromiseOrValue<BigNumberish>,
    timing: PromiseOrValue<BigNumberish>,
    n: PromiseOrValue<BigNumberish>,
    v: PromiseOrValue<BigNumberish>,
    r: PromiseOrValue<BytesLike>,
    s: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  nonce(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    TX_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    _DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

    initialize(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    mevTx(
      to: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      delegate: PromiseOrValue<boolean>,
      tip: PromiseOrValue<BigNumberish>,
      maxBaseFee: PromiseOrValue<BigNumberish>,
      timing: PromiseOrValue<BigNumberish>,
      n: PromiseOrValue<BigNumberish>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Executed(uint256)"(
      nonce?: PromiseOrValue<BigNumberish> | null
    ): ExecutedEventFilter;
    Executed(nonce?: PromiseOrValue<BigNumberish> | null): ExecutedEventFilter;
  };

  estimateGas: {
    TX_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    _DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mevTx(
      to: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      delegate: PromiseOrValue<boolean>,
      tip: PromiseOrValue<BigNumberish>,
      maxBaseFee: PromiseOrValue<BigNumberish>,
      timing: PromiseOrValue<BigNumberish>,
      n: PromiseOrValue<BigNumberish>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    nonce(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    TX_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mevTx(
      to: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      value: PromiseOrValue<BigNumberish>,
      delegate: PromiseOrValue<boolean>,
      tip: PromiseOrValue<BigNumberish>,
      maxBaseFee: PromiseOrValue<BigNumberish>,
      timing: PromiseOrValue<BigNumberish>,
      n: PromiseOrValue<BigNumberish>,
      v: PromiseOrValue<BigNumberish>,
      r: PromiseOrValue<BytesLike>,
      s: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    nonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
