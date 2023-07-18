from web3 import Web3
from django.conf import settings

infura_url = "https://sepolia.infura.io/v3/9380c5f994ee4c0599517d16a156aec6"
web3 = Web3(Web3.HTTPProvider(infura_url))

def get_transaction_details(transaction_hash, usdt_contract_address, usdt_contract_abi):
    try:
        transaction = web3.eth.get_transaction(transaction_hash)
    except:
        return None
    
    try:
        receipt = web3.eth.get_transaction_receipt(transaction_hash)
    except:
        return None
    
    from web3._utils.events import EventLogErrorFlags
           
    usdt_contract = web3.eth.contract(address=usdt_contract_address, abi=usdt_contract_abi)
    
    logs = usdt_contract.events.Transfer().process_receipt(receipt, EventLogErrorFlags.Warn)
    tx_input = transaction['input']
    decoded_input = usdt_contract.decode_function_input(tx_input)
    
    if decoded_input[0].fn_name == 'transfer' and len(logs)==1:
        transfer_data = decoded_input[1]
        amount = transfer_data["amount"]
        
        decimals = usdt_contract.functions.decimals().call()
        amount_usdt = amount / 10 ** decimals
        return transaction['from'], logs[0]['args']['to'], amount_usdt, receipt.status
    else:
        return transaction['from'], None, None, None


def send_transaction_to_user(receiver, value):
    caller = settings.CALLER_ADDRESS
    private_key = settings.PRIVATE_ADDRESS
    nonce = web3.eth.get_transaction_count(caller)
    abi = settings.CONTRACT_ABI
    contract_address = settings.CONTRACT_ADDRESS

    contract = web3.eth.contract(address=contract_address, abi=abi)

    release_tx = contract.functions.release(receiver, value).build_transaction(
    {
        'from': caller,
        'nonce': nonce,
    })

    tx_create = web3.eth.account.sign_transaction(release_tx, private_key=private_key)
    tx_hash = web3.eth.send_raw_transaction(tx_create.rawTransaction)
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    return tx_receipt


