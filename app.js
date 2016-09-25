(function (){
  'use strict';

  var initialToBuyList = [
    {
      name: "Milk",
      quantity: "1"
    },
    {
      name: "Donuts",
      quantity: "12"
    },
    {
      name: "Cookies",
      quantity: "36"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Steak",
      quantity: "4"
    }
  ];





  //NG-APP
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  //toBuyController
  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService){
    var toBuyController = this;

    toBuyController.toBuyList = ShoppingListCheckOffService.getToBuyList();
    toBuyController.buyItem = function (index, name, quantity) {
      ShoppingListCheckOffService.checkOff(index, name, quantity);
    };
  };




  //alreadyBoughtController
  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
    var boughtController = this;

    boughtController.boughtList = ShoppingListCheckOffService.getBoughtList();
  };



  //SERVICE
  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyList = initialToBuyList;
    var boughtList = [];

    service.getToBuyList = function () {
      return toBuyList;
    };

    service.getBoughtList = function () {
      return boughtList;
    };

    function addToBoughtList(itemName, itemQuantity) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      boughtList.push(item);
    };

    service.checkOff = function (itemIndex, name, quantity) {
      var boughtItem = toBuyList.splice(itemIndex, 1);
      addToBoughtList(name, quantity);
    };

  };



})();
