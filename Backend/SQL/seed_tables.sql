INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Vegetables');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Fruits');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Grains');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Meat');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Seafood');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Dairy');

INSERT INTO `VENDOR` (`VEND_ID`,`VEND_NAME`,`VEND_ADDR`,`VEND_CITY`,`VEND_PHN`) VALUES (1,'superu','127  Square de la Couronne','PALAISEAU','01.43.68.82723');
INSERT INTO `VENDOR` (`VEND_ID`,`VEND_NAME`,`VEND_ADDR`,`VEND_CITY`,`VEND_PHN`) VALUES (2,'monoprix','38  rue Pierre De Coubertin','TOULOUSE','05.23.62.93594');
INSERT INTO `VENDOR` (`VEND_ID`,`VEND_NAME`,`VEND_ADDR`,`VEND_CITY`,`VEND_PHN`) VALUES (3,'auchan','112  place de Miremont','VILLEPARISIS','01.09.82.68788');

INSERT INTO `CUSTOMER` (`CUST_UNAME`,`CUST_FNAME`,`CUST_LNAME`,`CUST_PWD`,`CUST_ADDR`,`CUST_CITY`,`CUST_ZIP`,`CUST_IS_ADMIN`,`CUST_IS_BLOCKED`) VALUES ('Admin','Rambo','Noris','3bcee0ec823b4868cc3bdcaa80f370e3abe1d8c1','Sous la Tour Eiffel','Paris',711000,1,0);

INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Paris');
INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Marseille');
INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Montreal');
INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Berlin');
INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Rome');

INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`,`PROD_MASS`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`, `FOOD_IMG`) VALUES ('1', 'Sorted Apples','200', '1', '3.12', 'Fruits','http://10.0.0.10/.images/apples.webp');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`,`PROD_MASS`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`, `FOOD_IMG`) VALUES ('2', 'Veggies Pack','40', '2', '2.10', 'Vegetables','http://10.0.0.10/.images/veggies.jpg');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`,`PROD_MASS`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`, `FOOD_IMG`) VALUES ('3', 'Sausages','50', '3', '1.10', 'Meat','http://10.0.0.10/.images/sossisdoux.jpg');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`,`PROD_MASS`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`, `FOOD_IMG`) VALUES ('4', 'Shrimps','90','2', '5.14', 'Seafood','http://10.0.0.10/.images/shrimps.jpg');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`,`PROD_MASS`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`, `FOOD_IMG`) VALUES ('5', 'Cheese','30','1', '1.16', 'Dairy','http://10.0.0.10/.images/fromazkraff.jpg');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`,`PROD_MASS`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`, `FOOD_IMG`) VALUES ('6', 'Green Peas ','70','1', '2.10', 'Grains','http://10.0.0.10/.images/greenpeas.jpg');


INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('1', '10', 'Montreal');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('2', '10', 'Paris');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('3', '4', 'Berlin');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('4', '7', 'Rome');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('5', '7', 'Marseille');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('6', '5', 'Paris');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('5', '4', 'Paris');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('4', '3', 'Paris');
