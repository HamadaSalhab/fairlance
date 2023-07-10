import web3.exceptions
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://ethereum-mainnet-rpc.allthatnode.com/EokbYWHz27mXR2C7MAoJ0xeM3a7RwBBA'))


def get_transaction(transaction_hash):
    try:
        d = w3.eth.get_transaction(transaction_hash=transaction_hash)
        from_addr, to_addr, value = d['from'], d['to'], d['value']
        return from_addr, to_addr, value
    except web3.exceptions.TransactionNotFound:
        return None
