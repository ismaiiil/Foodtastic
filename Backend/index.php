<?php
header("Access-Control-Allow-Origin: *");
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

abstract class DBHelper {
    
    
    private static $PDOInstance = null;

    const DEFAULT_SQL_TYPE = "mysql";
  
    const DEFAULT_SQL_USER = "foodtastic";

    const DEFAULT_SQL_HOST = "127.0.0.1";

    const DEFAULT_SQL_PASS = "foodtastic";

    const DEFAULT_SQL_DTB = "foodtastic";


    
    public static function getInstance() {
        if(is_null(self::$PDOInstance)) {
            try{
                self::$PDOInstance = new PDO(self::DEFAULT_SQL_TYPE.':dbname='.self::DEFAULT_SQL_DTB.';host='.self::DEFAULT_SQL_HOST,self::DEFAULT_SQL_USER ,self::DEFAULT_SQL_PASS,
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
  
    public static function execAssoc($query, $params = null) {
        $request = self::getInstance()->prepare($query);
        if(is_array($params)) {
            foreach ($params as $key => $value) {
                $request->bindValue(':'.$key, $value);
            }
        }
        $request->execute();
        $result = $request>fetchAll(PDO::FETCH_ASSOC);
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
    
    public static function justOne($array){
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
    
    public static function delete($table){
        if (!empty($table)) {
        $query   = "DELETE FROM TABLE ".$table." ;";
        $request = self::getInstance()->prepare($query);
        return $request->execute();
    }
    return FALSE;
    }
    
    public static function resetAI($table){
        $query = "ALTER TABLE ".$table." AUTO_INCREMENT = 1";
        $request = self::getInstance()->prepare($query);
        return $request->execute();
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

class CustomerDao extends DBHelper {
    public static $TABLE = "CUSTOMER";

    public static function save(CUSTOMER $customer){
        $query = "INSERT INTO ".CustomerDao::$TABLE." (`CUST_UNAME`,`CUST_FNAME`,`CUST_LNAME`,`CUST_PWD`,`CUST_ADDR`,`CUST_CITY`,`CUST_ZIP`,`CUST_IS_ADMIN`,`CUST_IS_BLOCKED`) "
                . "VALUES ( :CUST_UNAME, :CUST_FNAME, :CUST_LNAME, :CUST_PWD, :CUST_ADDR, :CUST_CITY, :CUST_ZIP, :CUST_IS_ADMIN, :CUST_IS_BLOCKED);";
          $params = array(
            'CUST_UNAME' => $customer->$CITY_NAME, 
            'CUST_FNAME' => $customer->$CUST_FNAME, 
            'CUST_LNAME' => $customer->$CUST_LNAME, 
            'CUST_PWD' => $customer->$CUST_PWD, 
            'CUST_ADDR' => $customer->$CUST_ADDR, 
            'CUST_CITY' => $customer->$CUST_CITY, 
            'CUST_ZIP' => $customer->$CUST_ZIP, 
            'CUST_IS_ADMIN' => $customer->$CUST_IS_ADMINCIA, 
            'CUST_IS_BLOCKED' => $customer->$CUST_IS_BLOCKED
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
          return $user;
    }

    public static function getByUsername($username) {
        $query = "SELECT * FROM ".CustomerDao::$TABLE." WHERE CUST_UNAME = :CUST_UNAME";
        return self::justOne(self::execute($query, "CUSTOMER", array('CUST_UNAME' => $userName)));
    }

    public static function checkUsernameAndPwd($username,$password){
        $query = "SELECT * FROM ".CustomerDao::$TABLE." WHERE CUST_UNAME = :username AND CUST_PWD = :password";
        return self::justOne(self::execute($query, "CUSTOMER", array(
            'username' => $username,
            'password' => sha1($password)
         )));
    }

}

class ProductDao extends DBHelper {
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

class FoodGroupDao extends DBHelper {
    public static $TABLE = "FOOD_GROUP";
    public static function listAllFoodGroups() {
    
        $query = "SELECT * FROM ".FoodGroupDao::$TABLE.";";
      
        return self::execute($query, "FOOD_GROUP");
    }
}

//echo json_encode(array_merge(['PRODUCTS' => ProductDao::allProducts()]));
//echo json_encode(array_merge(['PRODUCTS' => ProductDao::stock(4)]));
//echo json_encode(array_merge( ProductDao::searchProducts($_GET["max_price"],$_GET["name"],$_GET["category"],$_GET["max_mass"],$_GET["city"])));



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
        }else{
            echoJsonError(new Exception('no action selected or doesnt exist', 400));
        }
    }elseif($_GET["resources"] == "customer"){
        if($_GET["action"] == "register"){
            if($_GET["username"] && $_GET["firstname"] && $_GET["lastname"] && $_GET["password"] && $_GET["address"] && $_GET["city"] 
            && $_GET["zip"]){
                $customer = new CUSTOMER();
                $customer->$CUST_UNAME = $_GET["username"];
                $customer->$CUST_FNAME = $_GET["firstname"];
                $customer->$CUST_LNAME = $_GET["lastname"];
                $customer->$CUST_PWD = sha1($_GET["password"]);
                $customer->$CUST_ADDR = $_GET["address"];
                $customer->$CUST_CITY = $_GET["city"];
                $customer->$CUST_ZIP = $_GET["zip"];
                $customer->$CUST_IS_ADMIN = 0;
                $customer->$CUST_IS_BLOCKED = 0;
                if(CustomerDao::getByUsername($_REQUEST["username"])){
                    echoJsonError(new Exception('Username already exists', 409));
                }
                else {
                    $user = CustomerDao::save($customer);
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
                    echo json_encode(sha1("secret"));
                    echo json_encode(sha1("admin"));
                    echo json_encode(sha1("Admin"));
                    echo json_encode(sha1("foodtastic"));
                    echoJsonError(new Exception('Username<>Password combination not found', 204));
                }
            }
            else {
                echoJsonError(new Exception('missing parameters', 400));
            }
        }elseif($_REQUEST["action"] == "logout") {
            unset($_SESSION['customer']);
            echoJsonError(new Exception('You have been succesfully logged out', 200));
        }else{
            echoJsonError(new Exception('no action selected or doesnt exist', 400));
        }
    }else{
        echoJsonError(new Exception('this resource doesnt exist', 404));
    }

}else{
    echoJsonError(new Exception('No resource selected!', 404));
}