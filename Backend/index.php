<?php
@session_start();
abstract class DBHelper {
    
    
    private static $PDOInstance = null;
  
    private static $error = false;
  
    //private static $instance = null;

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
                self::$error = true;
                die('Error : ' . $e->getMessage());
            }
        }
        return self::$PDOInstance;
    }
  
    public static function isInError() {  
        return self::$error;
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
                self::$error = true;
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
                self::$error = true;
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

class Product {
    public $PROD_ID;
    public $PROD_NAME;
    public $VEND_ID;
    public $PROD_NETPR;
    public $FOOD_CAT;

    public function __construct(){ }

}

class ProductDao extends DBHelper {
    public static $TABLE = "PRODUCT";
    public static function listAllProducts() {
    
        $query = "SELECT * FROM ".ProductDao::$TABLE.";";
      
        return self::execute($query, "PRODUCT");
    }
}

echo json_encode(ProductDao::listAllProducts());