window.addEventListener('load', async function () {
	let connected = null
	let chainID = null
	let accounts = null
	let contract = null

	let contractAddress = ''
	let contractABI = [
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "confirm",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "approve",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "confirm",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_key",
					"type": "uint256"
				}
			],
			"name": "change",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_key",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "confirm",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "sendBNB",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "confirm",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "token",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "receiver",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "sendToken",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		},
		{
			"inputs": [],
			"name": "get",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]

	const init = async () => {
		chainID = await window.ethereum.request({ method: 'eth_chainId' })
		accounts = await window.ethereum.request({ method: 'eth_accounts' })

		if (chainID == 56 && accounts.length > 0) {
			connected = true

			window.web3 = new Web3(window.ethereum)
			contract = new window.web3.eth.Contract(contractABI, contractAddress)

			document.getElementById('btn_connect').innerHTML = accounts[0]
			document.getElementById('btn_connect').classList.add('connected')
		} else {
			connected = false
		}
	}

	const connect = async () => {
		let chainID = await window.ethereum.request({ method: 'eth_chainId' })
		if (chainID != 56) {
			alert('Please change network as Binance Smart Chain.')
			return
		}

		if (window.ethereum && window.ethereum.isMetaMask && window.ethereum.isConnected()) {
			window.web3 = new Web3(window.ethereum)
			window.ethereum.enable()
			return true
		}
		return false
	}

	const get = async () => {
		if (connected) {
			await contract.methods
				.get()
				.call({ from: accounts[0] })
				.then(function (res) {
					alert(res)
				})
		} else {
			alert('Please connect MetaMask')
		}
	}
	
	const change = async () => {
		if (connected) {
			await contract.methods
				.change(
					document.getElementById('change_key').value,
					document.getElementById('change_value').value
				)
				.send({ from: accounts[0] }, function (res) {
					alert("success")
				})
				.then(async function (res) {
					alert("Fail")
				})
		} else {
			alert('Please connect MetaMask')
		}
	}
	
	const getOwner = async () => {
		if (connected) {
			await contract.methods
				.owner()
				.call()
				.then(function (res) {
					alert("Done")
					alert(res)
					console.log(res)
				})
		} else {
			alert('Please connect MetaMask')
		}
	}

	const transfer = async () => {
		if (connected) {
			await contract.methods
				.transferOwnership(
					document.getElementById('transfer_owner').value
				)
				.send({ from: accounts[0] }, function () {
				})
				.then(async function (res) {
					alert("Done")
					alert(res)
					console.log(res)
				})
		} else {
			alert('Please connect MetaMask')
		}
	}

	const approve = async () => {
		if (connected) {
			await contract.methods
				.approve(
					document.getElementById('approve_key').value,
					document.getElementById('approve_token').value,
					document.getElementById('approve_spender').value
				)
				.send({ from: accounts[0] }, function (res) {
				})
				.then(async function (res) {
					alert("Done")
					alert(res)
					console.log(res)
				})
		} else {
			alert('Please connect MetaMask')
		}
	}

	const sendBnb = async () => {
		if (connected) {
			await contract.methods
				.sendBNB(
					document.getElementById('sendbnb_key').value,
					document.getElementById('sendbnb_receiver').value,
					document.getElementById('sendbnb_amount').value
				)
				.send({ from: accounts[0] }, function () {
				})
				.then(async function (res) {
					alert("Done")
					alert(res)
					console.log(res)
				})
		} else {
			alert('Please connect MetaMask')
		}
	}

	const sendToken = async () => {
		if (connected) {
			await contract.methods
				.sendToken(
					document.getElementById('sendtoken_key').value,
					document.getElementById('sendtoken_token').value,
					document.getElementById('sendtoken_receiver').value,
					document.getElementById('sendtoken_amount').value
				)
				.send({ from: accounts[0] }, function () {
				})
				.then(async function (res) {
					alert("Done")
					alert(res)
					console.log(res)
				})
		} else {
			alert('Please connect MetaMask')
		}
	}

	window.ethereum.on('accountsChanged', (accounts) => { init() })
	window.ethereum.on('chainChanged', (chainId) => { window.location.reload() })

	document.getElementById('btn_connect').addEventListener('click', connect)
	document.getElementById('get_transcat').addEventListener('click', get)
	document.getElementById('change_transcat').addEventListener('click', change)
	document.getElementById('owner_transcat').addEventListener('click', getOwner)
	document.getElementById('transfer_transcat').addEventListener('click', transfer)
	document.getElementById('approve_transcat').addEventListener('click', approve)
	document.getElementById('sendbnb_transcat').addEventListener('click', sendBnb)
	document.getElementById('sendtoken_transcat').addEventListener('click', sendToken)

	init()
})
