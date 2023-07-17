from web3 import Web3
from django.conf import settings
# from django.conf import settings

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
    
    # print(transaction)
    # print("heee")
    # print(receipt)
    from web3._utils.events import EventLogErrorFlags
           
            
    

    # Retrieve the contract instance
    usdt_contract = web3.eth.contract(address=usdt_contract_address, abi=usdt_contract_abi)
    
    logs = usdt_contract.events.Transfer().process_receipt(receipt, EventLogErrorFlags.Warn)
    tx_input = transaction['input']
    decoded_input = usdt_contract.decode_function_input(tx_input)
    
    if decoded_input[0].fn_name == 'transfer' and len(logs)==1:
        transfer_data = decoded_input[1]
        amount = transfer_data["amount"]
        
        # Convert the amount from the token's decimal places
        decimals = usdt_contract.functions.decimals().call()
        amount_usdt = amount / 10 ** decimals
        return transaction['from'], logs[0]['args']['to'], amount_usdt, receipt.status
    else:
        return transaction['from'], None, None, None


# transaction_hash = '0x4d8c621c8bc44ff682a6f26fa3de9ab67e1b6359545d01931a91848cad228977'
# print(get_transaction_details(transaction_hash))