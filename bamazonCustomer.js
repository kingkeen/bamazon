
// REQUIRE EXPRESS, INQUIRER, AND MYSQL

// RUN THE SCHEMA

// CONNECT TO SQL SERVER

// INQUIRE FOR THE REQUESTED INFORMATION

// DISPLAY THE INFORMATION- CREATE FOR-LOOP THRU THE DATA AND PUSH IT TO AN ARRAY TO THEN DISPLAY IN INQUIRER, THEN USE INQUIRER TO CHOOSE THE ITEM.
// ONCE ITEM IS CHOSEN, THEN CREATE MENU FOR WHAT TO DO WITH IT- TO BUY, HOW MANY- UPDATE THE DATABASE, RESTART THE FUNCTION

var mysql = require('mysql');
var inquirer = require('inquirer');

// global variable to hold the number of items for sale. 
var totalItems;

//creates a connection to MySQL database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'
});

//Provides status of SQL connection
connection.connect(function(err) {
    if (err) throw err;
    // console.log('connected as id' + connection.threadId + '\n\n');
    console.log("============== BAMAZON ==============", "\n");
    itemList();
});

// initial function to list items for sale
function itemList() {
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res){

	totalItems = res.length;

	for (i=0; i<res.length; i++) {
		console.log("==============", "\nItem #: "+ res[i].item_id + "\nItem: "+ res[i].product_name + "\nDepartment: " +res[i].department_name + "\nPrice: $" + res[i].price + "\nQuantity in Stock: " + res[i].stock_quantity);
		availableItems.push(res[i]);
		}
		// console.log(availableItems);
		options();
	});
};

// provides two options to buy an item# and how many of them.
function options(){
	inquirer.prompt([{
		name: "id",
		type: "input",
		message: "Which item would you like to buy? (List the item number)",
		//validation that the number input is a number and less than or equal to length of array. 
		validate: function(value) {
			if (isNaN(value) === false && value <=totalItems) {
				return true;
			} else {
				return false;
			}
		}
	},	
		{
			name: "quantity",
			type: "input",
			message: "How many would you like to buy?",
			validate: function(value) {
				if (isNaN(value)){
					return false;
				} else {
					return true;
				}
			}
		}
	]).then(function(answer){
		// console.log(answer);

		// check for if items being sold are in stock; if not, then send back to beginning. 
		var query = "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?"
		connection.query(query, {item_id: answer.id}, function (err, res) {
			// console.log(res[0].stock_quantity);

			var aquiredItem = res[0].product_name;

			if (answer.quantity <= res[0].stock_quantity) {
				// send query to update the mysql and display that the items were purchased. 
				
				var newStock = res[0].stock_quantity - answer.quantity;
				var purchaseCost = res[0].price*answer.quantity;
				
				var query2  = " UPDATE products SET ? WHERE ?";
				connection.query(query2, [{ stock_quantity: newStock }, { item_id: answer.id }], function (err, res){
					
					if (err) throw err;
					console.log("SUCCESS! You have purchased "+ answer.quantity + " of item: " + aquiredItem+ "!" + "\nFor a total cost of: $"+ purchaseCost);

					maybeProceed();
				});

			} else {
				console.log("\nSorry, not enough in stock!")
				options();
			}
		});



	});
};

function maybeProceed () {
	inquirer.prompt([{
		type: 'list',
		name: 'proceed',
		message: 'Would you like to make another purchase?',
		choices: ['Yes', 'No']
	}]).then(function(ans){
		// console.log(ans);
		if (ans.proceed === "Yes") {
			itemList();
		} else {
			console.log("THANK YOU FOR SHOPPING WITH US!");
		}
	})
}




















