// import Web3 from 'web3'
// var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/01d5d39c9b47480c929bbf0ba8796713", { timeout: 90000 }));
var app = angular.module('marriageApp', []);
var contract_address = "0x3fc066B19562b43b86dcf07a7a0E7bb5c336fd92";
var abi = [{"constant":false,"inputs":[{"internalType":"string","name":"husband","type":"string"},{"internalType":"string","name":"wife","type":"string"}],"name":"newMarriage","outputs":[{"internalType":"uint256","name":"uid","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMarriages","outputs":[{"components":[{"internalType":"string","name":"husband","type":"string"},{"internalType":"string","name":"wife","type":"string"},{"internalType":"uint256","name":"date","type":"uint256"}],"internalType":"struct MarriageRegister.Marriage[]","name":"_resgister","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"}]

var provider =  new ethers.providers.EtherscanProvider('rinkeby');
var contract = new ethers.Contract(contract_address, abi, provider);

var privateKey = '0xB99A87BA06DCBC2F6A6E6B267F249DB30F65234A666519BFB76A4D4FD16420FA';
var wallet = new ethers.Wallet(privateKey, provider);

app.controller('marriageCtrl', ['$scope', function($scope) {
	$scope.marriages = [];

	$scope.add_Marriage = function(husband, wife) {
		var contractWithSigner = contract.connect(wallet);
		contractWithSigner.newMarriage(husband, wife)
			.then(result => {
				console.log(result)
				$scope.get_Marriage()
			})
	}
	
	$scope.get_Marriage = function(husband, wife) {
		contract.getMarriages()
			.then(result => {
				$scope.marriages = result
				$scope.$apply();
			})
	}

	window.onload = $scope.get_Marriage()

  $scope.timestamp_To_Date = function(timestamp) {
		dateObj = new Date(timestamp * 1000); 
		console.log(timestamp)
    return dateObj.toDateString(); 
  }


  // $scope.

  // $scope.marriages = [{
  //   "wife":"Jane",
  //   "husband": "John",
  //   "timestamp": 1571552447
	// }];
	

}]);