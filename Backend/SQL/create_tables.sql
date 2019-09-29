

-- ************************************** `foodtastic`.`CUSTOMER`

CREATE TABLE `foodtastic`.`CUSTOMER`
(
 `CUST_UNAME` varchar(40) NOT NULL ,
 `CUST_FNAME` varchar(45) NOT NULL ,
 `CUST_LNAME` varchar(45) NOT NULL ,
 `CUST_PWD`   varchar(45) NOT NULL ,
 `CUST_ADDR`  varchar(45) NOT NULL ,
 `CUST_CITY`  varchar(45) NOT NULL ,
 `CUST_ZIP`   int NOT NULL ,
 `CUST_IS_ADMIN` bit NOT NULL,
 

PRIMARY KEY (`CUST_UNAME`)
);


-- ************************************** `foodtastic`.`VENDOR`

CREATE TABLE `foodtastic`.`VENDOR`
(
 `VEND_ID`   int NOT NULL AUTO_INCREMENT ,
 `VEND_NAME` varchar(45) NOT NULL ,
 `VEND_ADDR` varchar(45) NOT NULL ,
 `VEND_CITY` varchar(45) NOT NULL ,
 `VEND_PHN`  varchar(45) NOT NULL ,

PRIMARY KEY (`VEND_ID`)
) AUTO_INCREMENT=1;


-- ************************************** `foodtastic`.`SALES_CITY`
-- used to store the list of cities in which Foodstastic has Stock

CREATE TABLE `foodtastic`.`SALES_CITY`
(
 `CITY_NAME` varchar(45) NOT NULL ,

PRIMARY KEY (`CITY_NAME`)
);


-- ************************************** `foodtastic`.`FOOD_GROUP`
-- Food category type such as meat, veggies, etc...

CREATE TABLE `foodtastic`.`FOOD_GROUP`
(
 `FOOD_CAT` varchar(45) NOT NULL ,

PRIMARY KEY (`FOOD_CAT`)
);



-- ************************************** `foodtastic`.`SO_HEADER`

CREATE TABLE `foodtastic`.`SO_HEADER`
(
 `SO_NUM`     int NOT NULL AUTO_INCREMENT ,
 `CUST_UNAME` varchar(40) NOT NULL ,
 `SO_DATE`    datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
 `SO_TOTAL`   decimal(12,2) NOT NULL ,

PRIMARY KEY (`SO_NUM`),
KEY `FK_SO_CUST_UNAME` (`CUST_UNAME`),
CONSTRAINT `FK_SO_CUST_UNAME` FOREIGN KEY `FK_SO_CUST_UNAME` (`CUST_UNAME`) REFERENCES `foodtastic`.`CUSTOMER` (`CUST_UNAME`) ON DELETE CASCADE
) AUTO_INCREMENT=1;


-- ************************************** `foodtastic`.`PRODUCT`

CREATE TABLE `foodtastic`.`PRODUCT`
(
 `PROD_ID`    int NOT NULL AUTO_INCREMENT ,
 `PROD_NAME`  varchar(50) NOT NULL ,
 `VEND_ID`    int NOT NULL ,
 `PROD_NETPR` decimal(12,2) NOT NULL ,
 `FOOD_CAT`   varchar(45) NULL ,

PRIMARY KEY (`PROD_ID`),
UNIQUE KEY `AK1_PROD_VEND_ID` (`PROD_NAME`, `VEND_ID`),
KEY `FK_PROD_VEND_ID` (`VEND_ID`),
CONSTRAINT `FK_PROD_VEND_ID` FOREIGN KEY `FK_PROD_VEND_ID` (`VEND_ID`) REFERENCES `foodtastic`.`VENDOR` (`VEND_ID`),
KEY `FK_PROD_FOOD_CAT` (`FOOD_CAT`),
CONSTRAINT `FK_PROD_FOOD_CAT` FOREIGN KEY `FK_PROD_FOOD_CAT` (`FOOD_CAT`) REFERENCES `foodtastic`.`FOOD_GROUP` (`FOOD_CAT`)
) AUTO_INCREMENT=1;


-- ************************************** `foodtastic`.`SO_LINE`

CREATE TABLE `foodtastic`.`SO_LINE`
(
 `SO_NUM`        int NOT NULL ,
 `PROD_ID`       int NOT NULL ,
 `SO_LINE_NETPR` decimal(12,2) NOT NULL ,
 `SO_LINE_QTY`   int NOT NULL ,

PRIMARY KEY (`SO_NUM`, `PROD_ID`),
KEY `FK_LINE_SO_NUM` (`SO_NUM`),
CONSTRAINT `FK_LINE_SO_NUM` FOREIGN KEY `FK_LINE_SO_NUM` (`SO_NUM`) REFERENCES `foodtastic`.`SO_HEADER` (`SO_NUM`) ON DELETE CASCADE,
KEY `FK_LINE_PROD_ID` (`PROD_ID`),
CONSTRAINT `FK_LINE_PROD_ID` FOREIGN KEY `FK_LINE_PROD_ID` (`PROD_ID`) REFERENCES `foodtastic`.`PRODUCT` (`PROD_ID`)
);


-- ************************************** `foodtastic`.`STOCK`

CREATE TABLE `foodtastic`.`STOCK`
(
 `PROD_ID`   int NOT NULL ,
 `STOCK_QTY` int NOT NULL ,
 `CITY_NAME` varchar(45) NOT NULL ,

PRIMARY KEY (`PROD_ID`, `CITY_NAME`),
KEY `FK_STOCK_PROD_ID` (`PROD_ID`),
CONSTRAINT `FK_STOCK_PROD_ID` FOREIGN KEY `FK_STOCK_PROD_ID` (`PROD_ID`) REFERENCES `foodtastic`.`PRODUCT` (`PROD_ID`),
KEY `FK_STOCK_CITY_NAME` (`CITY_NAME`),
CONSTRAINT `FK_STOCK_CITY_NAME` FOREIGN KEY `FK_STOCK_CITY_NAME` (`CITY_NAME`) REFERENCES `foodtastic`.`SALES_CITY` (`CITY_NAME`)
);





















