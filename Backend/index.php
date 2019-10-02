<?php

@session_start();

function echoJsonError($e){
    echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ),
    ));
    die();
}

abstract class BaseDB {
    
    
    private static $PDOInstance = null;

    const SQL_TYPE = "mysql";
  
    const DB_USER = "foodtastic";

    const DB_HOST = "127.0.0.1";

    const DB_PASSWORD = "foodtastic";

    const DB_SCHEMA = "foodtastic";


    
    public static function getInstance() {
        if(is_null(self::$PDOInstance)) {
            try{
                self::$PDOInstance = new PDO(self::SQL_TYPE.':dbname='.self::DB_SCHEMA.';host='.self::DB_HOST,self::DB_USER ,self::DB_PASSWORD,
                        array(
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
            ));
            }
            catch (Exception $e) {
                echoJsonError($e);
            }
            
        }
        return self::$PDOInstance;
    }
  
    
    
    public static function prepare($query) {
        return self::getInstance()->prepare($query);
    }
    
    public static function query($query) {
        return self::getInstance()->query($query);
    }

    public static function exec($query, $params = null, $fetch = false) {
        $request = self::getInstance()->prepare($query);
        if(is_array($params)) {
            foreach ($params as $key => $value) {
                $request->bindValue(':'.$key, $value);
            }
        }
        $request->execute();
        $result = null;
        if($fetch) {
            $result = $request->fetchAll();
        }
        return $result;
    }

    
    public static function execute($query, $objectType, $params = NULL) {
        if (!empty($query) && is_string($query) && !empty($objectType) && is_string($objectType)) {
            $pdo   = self::getInstance();
            $result = null;
            
            try {
                $request = $pdo->prepare($query);
                
                if (!empty($params) && is_array($params)) {
                    foreach ($params as $key => $value) {
                        $request->bindValue(':'.$key, $value);
                    }      
                }
                
                $request->execute();
                $result = $request->fetchAll(PDO::FETCH_CLASS, $objectType);
            } catch(PDOException $ex) {
                echoJsonError($e);
            }
            return $result;
        }
        else {
            return false;
        }
    }
    
    public static function load($table, $objectType, $start = 0, $end = null) {
        
        if (!empty($table) && is_string($table) && !empty($objectType) && is_string($objectType)) {
            $pdo   = self::getInstance();
            $result = null;
            $query = 'SELECT * FROM '.$table;
            
            try {
                $request = $pdo->prepare($query);
                
                if(is_numeric($end) && $end > 0  && is_numeric($start)) {
                    $query .= ' LIMIT '.$start.', '.$end;
                }
                
                $request->execute();
                $result = $request->fetchAll(PDO::FETCH_CLASS, $objectType);
            } catch(PDOException $ex) {
                echoJsonError($e);
            }
            
            return $result;
        }
        else {
            return false;
        }
    }
    
    public static function first_one($array){
        if(is_array($array) && isset($array[0])){
            return $array[0];
        }
        else {
            return $array;           
        }
    }

    
    public static function beginTransaction() {
        self::getInstance()->beginTransaction();
    }

    public static function commit() {
        if(self::getInstance()->inTransaction()) {
            self::getInstance()->commit();
        }
    }

    public static function rollBack() {
        if(self::getInstance()->inTransaction()) {
            self::getInstance()->rollBack();
        }
    }

    public static function inTransaction() {
        return self::getInstance()->inTransaction();
    }
    
    public static function getLastInsertId() {
        return self::getInstance()->lastInsertId();
    }  
    
}

class FINAL_PRODUCT {
    public $PROD_ID;
    public $PROD_NAME;
    public $PROD_MASS;
    public $VEND_NAME;
    public $PROD_NETPR;
    public $FOOD_CAT;
    public $FOOD_IMG;
    public $STOCK_QTY;
    public $CITY_NAME;
    public function __construct(){ }
}

class PRODUCT{
    public $PROD_ID;
    public $PROD_NAME;
    public $PROD_MASS;
    public $VEND_ID;
    public $PROD_NETPR;
    public $FOOD_CAT;
    public $FOOD_IMG;
    public function __construct(){ }
}

class FOOD_GROUP {
    public $FOOD_CAT;
    public function __construct(){ }
}

class CUSTOMER {
    public $CUST_UNAME;
    public $CUST_FNAME;
    public $CUST_LNAME;
    public $CUST_PWD;
    public $CUST_ADDR ;
    public $CUST_CITY;
    public $CUST_ZIP;
    public $CUST_IS_ADMIN;
    public $CUST_IS_BLOCKED;
    public function __construct(){ }
}

class SO_HEADER{
    public $SO_NUM;
    public $CUST_UNAME;
    public $SO_DATE;
    public $SO_TOTAL;
    public function __construct(){ }
}

class SO_LINE{
    public $SO_NUM;
    public $PROD_ID;
    public $SO_LINE_NETPR;
    public $SO_LINE_QTY;
    public $CITY_NAME;
    public function __construct(){ }
}

class STOCK{
    public $PROD_ID;
    public $STOCK_QTY;
    public $CITY_NAME;
    public function __construct(){}
}

class SALES_CITY{
    public $CITY_NAME;
    public function __construct(){}
}

class CustomerDao extends BaseDB {
    public static $TABLE = "CUSTOMER";

    public static function makeAdmin($username){
        $query = "UPDATE ".CustomerDao::$TABLE." SET CUST_IS_ADMIN = '1' WHERE CUST_UNAME = :CUST_UNAME;";
        self::first_one(self::execute($query, "CUSTOMER", array(
            'CUST_UNAME' => $username
         )));

    }

    public static function removeAdmin($username){
        $query = "UPDATE ".CustomerDao::$TABLE." SET CUST_IS_ADMIN = '0' WHERE CUST_UNAME = :CUST_UNAME;";
        self::first_one(self::execute($query, "CUSTOMER", array(
            'CUST_UNAME' => $username
         )));

    }

    public static function block($username){
        $query = "UPDATE ".CustomerDao::$TABLE." SET CUST_IS_BLOCKED = '1' WHERE CUST_UNAME = :CUST_UNAME;";
        self::first_one(self::execute($query, "CUSTOMER", array(
            'CUST_UNAME' => $username
         )));

    }

    public static function unblock($username){
        $query = "UPDATE ".CustomerDao::$TABLE." SET CUST_IS_BLOCKED = '0' WHERE CUST_UNAME = :CUST_UNAME;";
        self::first_one(self::execute($query, "CUSTOMER", array(
            'CUST_UNAME' => $username
         )));

    }

    public static function save(CUSTOMER $customer){
        $query = "INSERT INTO ".CustomerDao::$TABLE." (`CUST_UNAME`,`CUST_FNAME`,`CUST_LNAME`,`CUST_PWD`,`CUST_ADDR`,`CUST_CITY`,`CUST_ZIP`,`CUST_IS_ADMIN`,`CUST_IS_BLOCKED`)
                VALUES (:CUST_UNAME, :CUST_FNAME, :CUST_LNAME, :CUST_PWD, :CUST_ADDR, :CUST_CITY, :CUST_ZIP, :CUST_IS_ADMIN, :CUST_IS_BLOCKED)
                ON DUPLICATE KEY UPDATE CUST_FNAME = :CUST_FNAME, CUST_LNAME=:CUST_LNAME, CUST_PWD=:CUST_PWD, CUST_ADDR=:CUST_ADDR, CUST_CITY=:CUST_CITY, CUST_ZIP=:CUST_ZIP;";
          
        $params = array(
            'CUST_UNAME' => $customer->CUST_UNAME, 
            'CUST_FNAME' => $customer->CUST_FNAME, 
            'CUST_LNAME' => $customer->CUST_LNAME, 
            'CUST_PWD' => $customer->CUST_PWD, 
            'CUST_ADDR' => $customer->CUST_ADDR, 
            'CUST_CITY' => $customer->CUST_CITY, 
            'CUST_ZIP' => $customer->CUST_ZIP, 
            'CUST_IS_ADMIN' => $customer->CUST_IS_ADMIN, 
            'CUST_IS_BLOCKED' => $customer->CUST_IS_BLOCKED
          );
          self::beginTransaction();
          try{
              self::exec($query, $params);
              self::commit();
              
          }
          catch (PDOException $ex) {
              self::rollBack();
              return false;
          }
          return $customer;
    }

    public static function getByUsername($username) {
        $query = "SELECT * FROM ".CustomerDao::$TABLE." WHERE CUST_UNAME = :CUST_UNAME";
        return self::first_one(self::execute($query, "CUSTOMER", array('CUST_UNAME' => $username)));
    }

    public static function checkUsernameAndPwd($username,$password){
        $query = "SELECT * FROM ".CustomerDao::$TABLE." WHERE CUST_UNAME = :username AND CUST_PWD = :password";
        return self::first_one(self::execute($query, "CUSTOMER", array(
            'username' => $username,
            'password' => sha1($password)
         )));
    }

}

class ProductDao extends BaseDB {
    public static $PRODUCT_TABLE = "PRODUCT";
    public static $STOCK_TABLE = "STOCK";
    public static $VENDOR_TABLE = "VENDOR";


    public static function allProducts(){
        $query ="SELECT* FROM ".ProductDao::$PRODUCT_TABLE.";";
        return self::execute($query, "PRODUCT");
    }

    public static function stockByIdAndCity($product_id,$city=null){
        return self::searchProducts(null,null,null,null,$city,$product_id);
    }

    public static function productByID($product_id){
        $query = "SELECT * FROM ".ProductDao::$PRODUCT_TABLE." WHERE PROD_ID = :PROD_ID;";
        return self::first_one(self::execute($query, "PRODUCT", array(
            'PROD_ID' => $product_id
         )));
    }

    public static function singleStockByIdAndCity($product_id,$city){
        $query = "SELECT * FROM ".ProductDao::$STOCK_TABLE." WHERE PROD_ID = :PROD_ID AND CITY_NAME = :CITY_NAME  ";
        return self::first_one(self::execute($query, "STOCK", array(
            'PROD_ID' => $product_id,
            'CITY_NAME' => $city
         )));
    }

    public static function updateStock($product_id,$city,$stock){
        $query = "UPDATE ".ProductDao::$STOCK_TABLE." SET STOCK_QTY = :STOCK_QTY WHERE PROD_ID = :PROD_ID AND CITY_NAME = :CITY_NAME";
        self::first_one(self::execute($query, "STOCK", array(
            'STOCK_QTY' => $stock,
            'PROD_ID' => $product_id,
            'CITY_NAME' => $city
         )));
    }

    public static function addNewStockToCity($product_id,$city,$stock){
            $query = "INSERT INTO ".ProductDao::$STOCK_TABLE." (`PROD_ID`, `STOCK_QTY`, `CITY_NAME`) VALUES (:PROD_ID, :STOCK_QTY, :CITY_NAME);";
            $params = array(
                'PROD_ID' => $product_id, 
                'STOCK_QTY' => $stock, 
                'CITY_NAME' => $city
            );
            self::beginTransaction();
            try{
                self::exec($query, $params);
                self::commit();

            }
            catch (PDOException $ex) {
                self::rollBack();
                return false;
            }
            return true;
    }


    public static function searchProducts($max_price= null,$name_search = null,$food_type= null,$max_mass = null,$location = null,$prod_id = null) {
    

         $query ="SELECT P.PROD_ID, P.PROD_NAME,P.PROD_MASS, V.VEND_NAME, P.PROD_NETPR, P.FOOD_CAT, P.FOOD_IMG, S.STOCK_QTY, S.CITY_NAME
                    FROM ".ProductDao::$STOCK_TABLE." AS S
                    RIGHT OUTER JOIN ".ProductDao::$PRODUCT_TABLE." AS P ON S.PROD_ID = P.PROD_ID
                    RIGHT OUTER JOIN ".ProductDao::$VENDOR_TABLE." AS V ON P.VEND_ID = V.VEND_ID
                    WHERE P.PROD_NAME LIKE '%".$name_search."%'";
        
        if(!empty($max_price)){
            $query = $query."AND P.PROD_NETPR<=".$max_price."";
        }
        if(!empty($food_type)){
            $query = $query."AND P.FOOD_CAT='".$food_type."'";
        }
        if(!empty($max_mass)){
            $query = $query."AND P.PROD_MASS<=".$max_mass."";
        }
        if(!empty($location)){
            $query = $query."AND S.CITY_NAME='".$location."'";
        }
        if(!empty($prod_id)){
            $query = $query."AND P.PROD_ID='".$prod_id."'";
        }
        $query = $query.";";
        return self::execute($query, "FINAL_PRODUCT");
    }

}

class FoodGroupDao extends BaseDB {
    public static $TABLE = "FOOD_GROUP";
    public static function listAllFoodGroups() {
        $query = "SELECT * FROM ".FoodGroupDao::$TABLE.";";
        return self::execute($query, "FOOD_GROUP");
    }
}

class SalesCityDao extends BaseDB {
    public static $TABLE = "SALES_CITY";
    public static function listAllCities() {
        $query = "SELECT * FROM ".SalesCityDao::$TABLE.";";
        return self::execute($query, "SALES_CITY");
    }

    public static function insertCity($city){
        $query = "INSERT INTO ".SalesCityDao::$TABLE." (`CITY_NAME`) VALUES (:CITY_NAME);";
        $params = array(
            'CITY_NAME' => $city,
            );
        self::beginTransaction();
        try{
            self::exec($query, $params);
            self::commit();
        }
        catch (PDOException $ex) {
            self::rollBack();
            return false;
        }
        return $city;
    }
}

class SalesDao extends BaseDB{
    public static $SO_HEADER_TABLE = "SO_HEADER";
    public static $SO_LINE_TABLE = "SO_LINE";
    public static function save_header(SO_HEADER $so_header) {
        
        if (is_null($so_header->SO_NUM)){
            $query = "INSERT INTO ".SalesDao::$SO_HEADER_TABLE." ( `CUST_UNAME`, `SO_TOTAL`)
            VALUES ( :CUST_UNAME, :SO_TOTAL)";
            $params = array(
                'CUST_UNAME' => $so_header->CUST_UNAME, 
                'SO_TOTAL' => $so_header->SO_TOTAL
              );
        }else{
            $query = "INSERT INTO ".SalesDao::$SO_HEADER_TABLE." ( `SO_NUM`,`CUST_UNAME`, `SO_TOTAL`)
            VALUES ( :SO_NUM, :CUST_UNAME, :SO_TOTAL)
            ON DUPLICATE KEY UPDATE SO_TOTAL = :SO_TOTAL;";
            $params = array(
                'SO_NUM' => $so_header->SO_NUM,
                'CUST_UNAME' => $so_header->CUST_UNAME, 
                'SO_TOTAL' => $so_header->SO_TOTAL
              );
        }

          self::beginTransaction();
          try{
              self::exec($query, $params);
              $so_header->SO_NUM = self::getLastInsertId();
              self::commit();
              
          }
          catch (PDOException $ex) {
              self::rollBack();
              return false;
          }
          return $so_header;
    }

    public static function create_line(SO_LINE $so_line){
        $query = "INSERT INTO ".SalesDao::$SO_LINE_TABLE." (  `SO_NUM`, `PROD_ID`, `SO_LINE_NETPR`, `SO_LINE_QTY` ,`CITY_NAME`)
        VALUES (:SO_NUM, :PROD_ID, :SO_LINE_NETPR, :SO_LINE_QTY , :CITY_NAME );";
        $params = array(
            'SO_NUM' => $so_line->SO_NUM, 
            'PROD_ID' => $so_line->PROD_ID, 
            'SO_LINE_NETPR' => $so_line->SO_LINE_NETPR, 
            'SO_LINE_QTY' => $so_line->SO_LINE_QTY,
            'CITY_NAME' => $so_line->CITY_NAME
          );
          self::beginTransaction();
          try{
              self::exec($query, $params);
              self::commit();
              
          }
          catch (PDOException $ex) {
              self::rollBack();
              return false;
          }
          $so_header = SalesDao::find_header($so_line->SO_NUM);
          //echo ("THE SO HEADER FOUND WAS:".json_encode($so_header));
          $so_header->SO_TOTAL = $so_header->SO_TOTAL + ($so_line->SO_LINE_NETPR * $so_line->SO_LINE_QTY);
          //echo "TOTAL calculater IS::".$so_header->SO_TOTAL;
          $final_header = new SO_HEADER();
          $final_header->SO_NUM = $so_header->SO_NUM;
          $final_header->CUST_UNAME= $so_header->CUST_UNAME;
          $final_header->SO_DATE= $so_header->SO_DATE;
          $final_header->SO_TOTAL= $so_header->SO_TOTAL;
          //echo "TOTAL BEFORE SAVING::".$final_header->SO_TOTAL;
          //echo "PURCHASE NUMBER IS::".$final_header->SO_NUM;

          self::save_header($final_header);

          

          return $so_line;
    }

    public static function find_header($so_num){
        $query = "SELECT * FROM ".SalesDao::$SO_HEADER_TABLE." WHERE SO_NUM = :so_num";
        return self::first_one(self::execute($query, "SO_HEADER", array(
            'so_num' => $so_num
         )));
    }
}
//echo json_encode(array_merge(['PRODUCTS' => ProductDao::allProducts()]));
//echo json_encode(array_merge(['PRODUCTS' => ProductDao::stock(4)]));
//echo json_encode(array_merge( ProductDao::searchProducts($_GET["max_price"],$_GET["name"],$_GET["category"],$_GET["max_mass"],$_GET["city"])));



if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $data = json_decode(file_get_contents('php://input'));
    //echo json_encode($data);

    if(isset($_SESSION['customer'])){
        $_SESSION['customer'] = CustomerDao::getByUsername($_SESSION['customer']->CUST_UNAME);
        if($_SESSION['customer']->CUST_IS_BLOCKED == '1'){
            echoJsonError(new Exception('Your account has been block and cannot checkout, please contact support!', 401));
        }
    }

    if(isset($_SESSION['customer'])){
    //json should look like this:
    //{"resources":"sales","products":[{"prod_id":"2", "quantity":"3", "city":"Paris"},{"prod_id":"4", "quantity":"2", "city":"Berlin"}] }
        if($data->resources == "sales"){
            //create header
            $so_header = new SO_HEADER();
            $so_header->SO_NUM = null;
            $so_header->CUST_UNAME = $_SESSION['customer']->CUST_UNAME;
            $so_header->SO_TOTAL = 0;
            $so_header = SalesDao::save_header($so_header);
            //echo json_encode($so_header);
            //then add lines to it
            $final_lines = [];
            foreach ($data->products as $key => $value ) {

                //check stock availability
                $stock = ProductDao::singleStockByIdAndCity($value->PROD_ID, $value->CITY_NAME);
                //echo json_encode($value->prod_id);
                
                if(isset($stock) && $stock->STOCK_QTY >= $value->BUY_QUANTITY){
                    $so_line = new SO_LINE();
                    $so_line->SO_NUM = $so_header->SO_NUM ;
                    $so_line->PROD_ID = $value->PROD_ID;
                    $so_line->SO_LINE_NETPR = ProductDao::productByID($value->PROD_ID)->PROD_NETPR ;
                    $so_line->SO_LINE_QTY = $value->BUY_QUANTITY;
                    $so_line->CITY_NAME = $value->CITY_NAME;
                    array_push($final_lines,SalesDao::create_line($so_line));
                    //update stock
                    ProductDao::updateStock($so_line->PROD_ID,$so_line->CITY_NAME,($stock->STOCK_QTY)-($so_line->SO_LINE_QTY));
                }else{
                    $ERROR["error"] = "Not enough of item id: ".$value->PROD_ID." in".$value->CITY_NAME."to be added to the purchase";
                    array_push($final_lines,$ERROR);
                }
                
                
            }

            $so_header = SalesDao::find_header($so_header->SO_NUM);
            echo json_encode(array_merge(['SO_HEADER' => $so_header, 'SO_LINE' => $final_lines]));
        }
        die();
    }else{
        echoJsonError(new Exception('Unathorized access, please login'.$_SESSION['customer'], 401));
    }

    
}

if(isset($_GET["resources"])){


    if($_GET["resources"] == "products"){

        if($_GET["action"] == "all"){
            
            echo json_encode(array_merge(['data' => ProductDao::allProducts()]));
            die();
        }
        elseif ($_GET["action"] == "stock") {
            echo json_encode(array_merge(['data' => ProductDao::stockByIdAndCity($_GET["prod_id"],$_GET["city"])]));
            die();
        }
        elseif ($_GET["action"] == "search") {
            echo json_encode(array_merge(['data' => ProductDao::searchProducts($_GET["max_price"],$_GET["name"],$_GET["category"],$_GET["max_mass"],$_GET["city"])]));
            die();
        }elseif ($_GET["action"] == "listfilters") {
            echo json_encode(array_merge( [ 'food_group'=>FoodGroupDao::listAllFoodGroups(),'sales_city'=> SalesCityDao::listAllCities() ] ));
        }
        else{
            echoJsonError(new Exception('no action selected or doesnt exist', 400));
        }
    }elseif($_GET["resources"] == "customer"){
       
        if(isset($_SESSION['customer'])){
            $_SESSION['customer'] = CustomerDao::getByUsername($_SESSION['customer']->CUST_UNAME);
            if($_SESSION['customer']->CUST_IS_ADMIN == '1'){

                if($_GET["action"] == "make_admin"){
                    if($_GET["username"]){
                        //update user and set CUST_IS_ADMIN = '1';
                        $user =  CustomerDao::getByUsername($_GET["username"]);
                        if($user){
                            CustomerDao::makeAdmin($user->CUST_UNAME);
                            $SUCCESS['MSG'] = 'User'.$user->CUST_UNAME.' has been promoted to Admin';
                            echo json_encode($SUCCESS);
                            die();
                        }else{
                            echoJsonError(new Exception('User doesnt exist', 404));
                        }
                    }else{
                        echoJsonError(new Exception('missing parameters', 400));
                    }
                }elseif($_GET["action"] == "block_user"){
                    if($_GET["username"]){
                        //update user and set CUST_IS_BLOCKED = '1';
                        $user =  CustomerDao::getByUsername($_GET["username"]);
                        if($user){
                            CustomerDao::block($user->CUST_UNAME);
                            $SUCCESS['MSG'] = 'User'.$user->CUST_UNAME.' has been blocked';
                            echo json_encode($SUCCESS);
                            die();
                        }else{
                            echoJsonError(new Exception('User doesnt exist', 404));
                        }
                    }else{
                        echoJsonError(new Exception('missing parameters', 400));
                    }
                }elseif($_GET["action"] == "unblock_user"){
                    if($_GET["username"]){
                        //update user and set CUST_IS_BLOCKED = '1';
                        $user =  CustomerDao::getByUsername($_GET["username"]);
                        if($user){
                            CustomerDao::unblock($user->CUST_UNAME);
                            $SUCCESS['MSG'] = 'User'.$user->CUST_UNAME.' has been unblocked';
                            echo json_encode($SUCCESS);
                            die();
                        }else{
                            echoJsonError(new Exception('User doesnt exist', 404));
                        }
                    }else{
                        echoJsonError(new Exception('missing parameters', 400));
                    }
                }elseif($_GET["action"] == "remove_admin"){
                    if($_GET["username"]){
                        //update user and set CUST_IS_ADMIN = '0';
                        $user =  CustomerDao::getByUsername($_GET["username"]);
                        if($user){
                            CustomerDao::removeAdmin($user->CUST_UNAME);
                            $SUCCESS['MSG'] = 'User'.$user->CUST_UNAME.' has been demoted from Admin';
                            echo json_encode($SUCCESS);
                            die();
                        }else{
                            echoJsonError(new Exception('User doesnt exist', 404));
                        }
                    }else{
                        echoJsonError(new Exception('missing parameters', 400));
                    }
                }elseif($_GET["action"] == "add_city"){
                    if($_GET["name"]){
                        SalesCityDao::insertCity($_GET["name"]);
                        $SUCCESS['MSG'] = 'City '.$_GET["name"].' has been added';
                        echo json_encode($SUCCESS);
                        die();
                    }else{
                        echoJsonError(new Exception('missing parameters', 400));
                    }

                }
                elseif($_GET["action"] == "update_stock"){
                    if($_GET["PROD_ID"] && $_GET["STOCK_QTY"] && $_GET["CITY_NAME"]){
                        ProductDao::updateStock($_GET["PROD_ID"],$_GET["CITY_NAME"],$_GET["STOCK_QTY"]);
                        $SUCCESS['MSG'] = 'Stock on '.$_GET["PROD_ID"].' has been updated';
                        echo json_encode($SUCCESS);
                        die();
                    }else{
                        echoJsonError(new Exception('missing parameters', 400));
                    }

                }
                elseif($_GET["action"] == "add_stock"){
                    if($_GET["PROD_ID"] && $_GET["STOCK_QTY"] && $_GET["CITY_NAME"]){
                        if(ProductDao::addNewStockToCity($_GET["PROD_ID"],$_GET["CITY_NAME"],$_GET["STOCK_QTY"])){
                            $SUCCESS['MSG'] = 'Stock on '.$_GET["PROD_ID"].' has been updated';
                            echo json_encode($SUCCESS);
                            die();
                        }else{
                            echoJsonError(new Exception('Couldnt add stock to this city', 502));
                        }
                        
                    }else{
                        echoJsonError(new Exception('missing parameters', 400));
                    }

                }
            }
        }

        if($_GET["action"] == "register"){
            if($_GET["username"] && $_GET["firstname"] && $_GET["lastname"] && $_GET["password"] && $_GET["address"] && $_GET["city"] 
            && $_GET["zip"]){
                $customer = new CUSTOMER();
                $customer->CUST_UNAME = $_GET["username"];
                $customer->CUST_FNAME = $_GET["firstname"];
                $customer->CUST_LNAME = $_GET["lastname"];
                $customer->CUST_PWD = sha1($_GET["password"]);
                $customer->CUST_ADDR = $_GET["address"];
                $customer->CUST_CITY = $_GET["city"];
                $customer->CUST_ZIP = $_GET["zip"];
                $customer->CUST_IS_ADMIN = 0;
                $customer->CUST_IS_BLOCKED = 0;
                if(CustomerDao::getByUsername($_REQUEST["username"])){
                    echoJsonError(new Exception('Username already exists', 409));
                }
                else {
                    $customer = CustomerDao::save($customer);
                    if($customer) {
                        $_SESSION['customer'] = $customer;
                        echo json_encode($customer);
                        die();
                    }else{
                        echoJsonError(new Exception('An error occureed while saving customer', 502));
                    }
                }
            }else{
                echoJsonError(new Exception('wrong or missing customer details', 400));
            }
            
        }elseif($_GET["action"] == "login"){
            if($_GET["username"] && $_GET["password"]){
                $customer = CustomerDao::checkUsernameAndPwd($_GET["username"], $_GET["password"]);
                if($customer) {
                    $_SESSION['customer'] = $customer;
                    echo json_encode($customer);
                    die();
                }
                else {
                    echoJsonError(new Exception('Username<>Password combination not found', 204));
                }
            }
            else {
                echoJsonError(new Exception('missing parameters', 400));
            }
        }elseif($_REQUEST["action"] == "logout") {
            unset($_SESSION['customer']);
            echoJsonError(new Exception('You have been succesfully logged out', 200));
        }elseif($_GET["action"] == "update"){
            if($_GET["username"] && $_GET["firstname"] && $_GET["lastname"] && $_GET["password"] && $_GET["address"] && $_GET["city"] 
            && $_GET["zip"]){
                if($_GET["username"] && $_GET["password"]){
                    $customer = CustomerDao::checkUsernameAndPwd($_REQUEST["username"], $_REQUEST["password"]);
                    if($customer) {
                        $_SESSION['customer'] = $customer;
                    }
                }
                if ($customer) {
                    $customer->CUST_UNAME = $_GET["username"];
                    $customer->CUST_FNAME = $_GET["firstname"];
                    $customer->CUST_LNAME = $_GET["lastname"];
                    $customer->CUST_PWD = sha1($_GET["password"]);
                    $customer->CUST_ADDR = $_GET["address"];
                    $customer->CUST_CITY = $_GET["city"];
                    $customer->CUST_ZIP = $_GET["zip"];
                    $customer->CUST_IS_ADMIN = 0;
                    $customer->CUST_IS_BLOCKED = 0;
                    $customer = CustomerDao::save($customer);
                    if($customer) {
                        $_SESSION['customer'] = $customer;
                        echo json_encode($customer);
                        die();
                    }else{
                        echoJsonError(new Exception('An error occureed while saving customer', 502));
                    }
                }else{
                    echoJsonError(new Exception('invalid credentials used', 409));
                }
                
            }else{
                echoJsonError(new Exception('wrong or missing customer details', 400));
            }
        
        }
        else{
            echoJsonError(new Exception('no action selected or doesnt exist', 400));
        }
    }else{
        echoJsonError(new Exception('this resource doesnt exist', 404));
    }
}
else{
    echoJsonError(new Exception('No resource selected!', 404));
}


