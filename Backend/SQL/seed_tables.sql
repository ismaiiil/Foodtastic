INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Vegetables');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Fruits');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Grains');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Meat');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Seafood');
INSERT INTO `FOOD_GROUP` (`FOOD_CAT`) VALUES ('Dairy');

INSERT INTO `VENDOR` (`VEND_ID`,`VEND_NAME`,`VEND_ADDR`,`VEND_CITY`,`VEND_PHN`) VALUES (1,'superu','127  Square de la Couronne','PALAISEAU','01.43.68.82723');
INSERT INTO `VENDOR` (`VEND_ID`,`VEND_NAME`,`VEND_ADDR`,`VEND_CITY`,`VEND_PHN`) VALUES (2,'monoprix','38  rue Pierre De Coubertin','TOULOUSE','05.23.62.93594');
INSERT INTO `VENDOR` (`VEND_ID`,`VEND_NAME`,`VEND_ADDR`,`VEND_CITY`,`VEND_PHN`) VALUES (3,'auchan','112  place de Miremont','VILLEPARISIS','01.09.82.68788');

INSERT INTO `CUSTOMER` (`CUST_UNAME`,`CUST_FNAME`,`CUST_LNAME`,`CUST_PWD`,`CUST_ADDR`,`CUST_CITY`,`CUST_ZIP`,`CUST_IS_ADMIN`,`CUST_IS_BLOCKED`) VALUES ('Admin','Rambo','Noris','91c26a21b3c0a72947b9189d0ce717b697fc911240','Sous la Tour Eiffel','Paris',711000,1,0);

INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Paris');
INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Marseille');
INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Montreal');
INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Berlin');
INSERT INTO `foodtastic`.`SALES_CITY` (`CITY_NAME`) VALUES ('Rome');

INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`) VALUES ('1', 'Sorted Apples 200g', '1', '3.12', 'Fruits');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`) VALUES ('2', 'Veggies Pack 50g', '2', '2.10', 'Vegetables');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`) VALUES ('3', 'Sausages 30g', '3', '1.10', 'Meat');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`) VALUES ('4', 'Shrimps 50g', '2', '5.14', 'Seafood');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`) VALUES ('5', 'Cheese 40g', '3', '1.16', 'Dairy');
INSERT INTO `foodtastic`.`PRODUCT` (`PROD_ID`, `PROD_NAME`, `VEND_ID`, `PROD_NETPR`, `FOOD_CAT`) VALUES ('6', 'Green Peas 60g', '1', '2.10', 'Grains');


INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('1', '10', 'Montreal');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('2', '10', 'Paris');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('3', '4', 'Berlin');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('4', '7', 'Rome');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('5', '7', 'Marseille');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('6', '5', 'Paris');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('5', '4', 'Paris');
INSERT INTO `foodtastic`.`STOCK` (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES ('4', '3', 'Paris');
