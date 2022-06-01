const express = require("express");
const fileUpload  = require("express-fileupload");
// const controller = require("./controller/file.controller");
//  const uploadFile = require("./middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:5000/client/src/";
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session");
const app = express();
//app.use(fileupload);
app.use(fileUpload());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  session({
    key: "userId",
    secret: "123456",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 10 * 1000,
    },
  })
);

const CONNECTION_PARAM = {
  host: "127.0.0.1",
  port:"3307",
  user: "root",
  password: "",
  database: "chitfund",
};

app.get("/api", (req, res) => {
  res.send({ hello: "hello" });
});

app.get("/api/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    res.send("logout done"); // will always fire after session is destroyed
  });
});

app.post("/api/addGroup", async (req, res) => {
  const GroupGroupName = req.body.GroupGroupName;
  const GroupContactPersonName = req.body.GroupContactPersonName;
  const GroupCellPhone = req.body.GroupCellPhone;
  const GroupEmail = req.body.GroupEmail;
  const GroupMaxAllowedUsers = req.body.GroupMaxAllowedUsers;
  const GroupAmountPerUser = req.body.GroupAmountPerUser;
  const GroupTerms = req.body.GroupTerms;
  const GroupAddress = req.body.GroupAddress;
  const GroupCountry = req.body.GroupCountry;
  const GroupState = req.body.GroupState;
  const GroupCity = req.body.GroupCity;
  const GroupZipcode = req.body.GroupZipcode;
  const GroupStatus = req.body.GroupStatus;
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO `groups` ( `groupName`, `contactPerson`, `contactNumber`, `email`, `maxUserAllowed`, `amountPerUser`, `terms`, `address`, `country`, `state`, `city`, `zipcode`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    con.query(
      sql,
      [
        GroupGroupName,
        GroupContactPersonName,
        GroupCellPhone,
        GroupEmail,
        GroupMaxAllowedUsers,
        GroupAmountPerUser,
        GroupTerms,
        GroupAddress,
        GroupCountry,
        GroupState,
        GroupCity,
        GroupZipcode,
        GroupStatus,
      ],
      function (err, result) {
        console.log(result);
        if (!result) {
          console.log("group not exists");
          res.send({ message: "group not added" });
        } else {
          console.log("1 record inserted", result);
          res.send({ message: "group added" });
        }
        con.destroy();
      }
    );
  });
});

app.post("/api/editUser",async (req, res)  => {
  
    const users_id = req.body.users_id;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const dob = req.body.dob;
    const address = req.body.address;
    const contact = req.body.contact;

    const con = await mysql.createConnection(CONNECTION_PARAM);
      await con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "UPDATE  `users` SET `fullname`=?,`email`=?,`dob`=?,`address`=?, `contact`= ? WHERE `users_id` = ?";
      con.query(
        sql,
        [fullname, email,dob,address,contact,users_id],
        function (err, result, fields) {
          if (!result) {
            res.send({ message: "Error, err - "+err });
          } else {
            
            res.send({ message: "User Detail Update" });
          }
          con.destroy();
        }
      );
    });
  });

  app.post("/api/addUserPic",async (req, res)  => {
  
    const users_id = req.body.users_id;
    const con = await mysql.createConnection(CONNECTION_PARAM);
        if (!req.files) {
          return res.status(400).send("No files were uploaded.");
        }
        const pic = req.files.file;
        const picNewName =Date.now() +'-'+pic.name;
        const path = __dirname + "/client/src/assets/images/user_upload/" + picNewName ;
        await con.connect(function (err) {
        if (err) throw err;  
        pic.mv(path, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          var sql = "UPDATE `users` SET `pic` = ?  WHERE `users_id` = ?";
          con.query(
            sql,
            [picNewName, users_id],
            function (err, result, fields) {
              if (!result) {
                res.send({ message: "Error:",err:err,u:users_id,pic:picNewName});
              } else {
                  if(err) {
                      return res.end("Error uploading file.");
                  }else{return res.send({ status: "success", path: path });}
              }
              con.destroy();
            }
          );
        });
      });
    });
  
app.post("/api/addScheme", async (req, res) => {
  const SchemeSchemeName = req.body.SchemeSchemeName;
  const SchemeContactPerson = req.body.SchemeContactPerson;
  const SchemeCellPhone = req.body.SchemeCellPhone;
  const SchemeEmail = req.body.SchemeEmail;
  const SchemeMaxAllowedUser = req.body.SchemeMaxAllowedUser;
  const SchemeAmountPerUser = req.body.SchemeAmountPerUser;
  const SchemeTerm = req.body.SchemeTerm;
  const SchemeAddress = req.body.SchemeAddress;
  const SchemeCountry = req.body.SchemeCountry;
  const SchemeState = req.body.SchemeState;
  const SchemeCity = req.body.SchemeCity;
  const SchemeZipcode = req.body.SchemeZipcode;
  const SchemeDescription = req.body.SchemeDescription;
  const SchemeStartDate = req.body.SchemeStartDate;
  const SchemeEndDate = req.body.SchemeEndDate;
  const SchemeStatus = req.body.SchemeStatus;
  const con = await mysql.createConnection({
    host: "remotemysql.com",
    user: "vsYjoES5pe",
    password: "0UdYt67eGz",
    database: "vsYjoES5pe",
  });

  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO `schemes`(`schemeName`, `contactPerson`, `contactNumber`, `email`, `maxAllowedUser`, `amountPerUser`, `terms`, `address`, `country`, `state`, `city`, `zipcode`, `description`, `startDate`, `endDate`, `status`) VALUES (?, ?, ?, ?, ?  , ?, ?, ?, ?, ? ,   ?, ?, ?,?,?,?)";
    con.query(
      sql,
      [
        SchemeSchemeName,
        SchemeContactPerson,
        SchemeCellPhone,
        SchemeEmail,
        SchemeMaxAllowedUser,
        SchemeAmountPerUser,
        SchemeTerm,
        SchemeAddress,
        SchemeCountry,
        SchemeState,
        SchemeCity,
        SchemeZipcode,
        SchemeDescription,
        SchemeStartDate,
        SchemeEndDate,
        SchemeStatus,
      ],
      function (err, result) {
        console.log(result);
        if (!result) {
          console.log("Scheme not exists");
          res.send({ message: "Scheme not added" });
        } else {
          console.log("1 record inserted", result);
          res.send({ message: "Scheme added" });
        }
        con.destroy();
      }
    );
  });
});

function getFormatedDate(tempDate) {
  var temp = new Date(tempDate);
  var dd = temp.getDate();
  var mm = temp.getMonth() + 1;
  var yyyy = temp.getFullYear();
  var temp = yyyy + "/" + mm + "/" + dd;
  return temp;
}

app.post("/api/addTax", async (req, res) => {
  const TaxTaxType = req.body.TaxTaxType;
  const TaxTaxName = req.body.TaxTaxName;
  var TaxStartDate = getFormatedDate(req.body.TaxStartDate);
  var TaxEndDate = getFormatedDate(req.body.TaxEndDate);
  const TaxIncExc = req.body.TaxIncExc;
  const TaxTaxRate = req.body.TaxTaxRate;
  const TaxStatus = req.body.TaxStatus;
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO `taxes`(`taxType`, `taxName`, `startDate`, `endDate`, `exclusive_inclusive`, `taxRate`, `status`) VALUES (?, ?, ?, ?, ?, ?, ? )";
    con.query(
      sql,
      [
        TaxTaxType,
        TaxTaxName,
        TaxStartDate,
        TaxEndDate,
        TaxIncExc,
        TaxTaxRate,
        TaxStatus,
      ],
      function (err, result) {
        console.log(result);
        if (!result) {
          console.log("Tax not exists");
          res.send({ message: "Tax not added" });
        } else {
          console.log("1 record inserted", result);
          res.send({ message: "Tax added" });
        }
        con.destroy();
      }
    );
  });
});

app.post("/api/addNotification", async (req, res) => {
  const NotificationNotificationType = req.body.NotificationNotificationType;
  const NotificationNotificationName = req.body.NotificationNotificationName;
  const NotificationDetailMessage = req.body.NotificationDetailMessage;
  const NotificationMedium = req.body.NotificationMedium;
  const NotificationStatus = req.body.NotificationStatus;

  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO `notifications`(`notificationType`, `notificationName`, `detailMessage`, `medium`, `status`) VALUES (?, ?, ?, ?, ?)";
    con.query(
      sql,
      [
        NotificationNotificationType,
        NotificationNotificationName,
        NotificationDetailMessage,
        NotificationMedium,
        NotificationStatus,
      ],
      function (err, result) {
        console.log(result);
        if (!result) {
          console.log("Notification not exists");
          res.send({ message: "Notification not added" });
        } else {
          console.log("1 record inserted", result);
          res.send({ message: "Notification added" });
        }
        con.destroy();
      }
    );
  });
});

function getTodayDate() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  return yyyy + "-" + mm + "-" + dd;
}

app.post("/api/addCompanyUser", async (req, res) => {
  const UserSalutation = req.body.UserSalutation;
  const UserFirstName = req.body.UserFirstName;
  const UserLastName = req.body.UserLastName;
  const UserCellPhone = req.body.UserCellPhone;
  const UserAlternateContact = req.body.UserAlternateContact;
  const UserEmail = req.body.UserEmail;
  const UserGender = req.body.UserGender;
  const UserAddress = req.body.UserAddress;
  const UserCountry = req.body.UserCountry;
  const UserState = req.body.UserState;
  const UserCity = req.body.UserCity;
  const UserZipcode = req.body.UserZipcode;
  const UserStatus = req.body.UserStatus;

  const con = await mysql.createConnection(CONNECTION_PARAM);
  const date = getTodayDate();
  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO `companyusers` ( `salutation`, `firstname`,`lastname`,`cellphone`,`alternateContact`,`email`,`gender`,`address`,`country`,`state`,`city`,`zipcode`, `status`,`createdAt`)    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    con.query(
      sql,
      [
        UserSalutation,
        UserFirstName,
        UserLastName,
        UserCellPhone,
        UserAlternateContact,
        UserEmail,
        UserGender,
        UserAddress,
        UserCountry,
        UserState,
        UserCity,
        UserZipcode,
        UserStatus,
        date,
      ],
      function (err, result) {
        console.log(result);
        if (!result) {
          console.log("User not exists");
          res.send({ message: "User not added" });
        } else {
          console.log("1 record inserted", result);
          res.send({ message: "User added" });
        }
        con.destroy();
      }
    );
  });
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const contact = req.body.contact;
  const pic = req.body.pic;
  const address = req.body.address;
  const con = await mysql.createConnection(CONNECTION_PARAM);
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO users (fullname,email,password,contact,pic,address) VALUES (?,?,?,?,?,?)";
    con.query(
      sql,
      [fullname, email, password, contact, pic, address],
      function (err, result) {
        if (!result) {
          console.log("user exists");
          res.send({ message: "User exist" });
        } else {
          console.log("1 record inserted", result);
          res.send({ message: "User added" });
        }
        con.destroy();
      }
    );
  });
});

app.get("/api/getGroupData", async (req, res) => {
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT * FROM `groups` Where `deleted`='0'";
    con.query(sql, function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/getSchemeDataforuser", async (req, res) => {
  const userid = req.body.userid;
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT users.*, schemes.*, plans.* FROM users INNER JOIN users_schemes ON users.users_id = users_schemes.users_id INNER JOIN schemes ON users_schemes.idSchemes = schemes.idSchemes INNER JOIN plans ON schemes.idplans = plans.idplans where schemes.deleted='0' AND users.users_id=?";
    con.query(sql, [userid], function (err, result) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/getBidDataforuser", async (req, res) => {
  const userid = req.body.userid;
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT users.*, schemes.*, plans.* FROM users INNER JOIN users_schemes ON users.users_id = users_schemes.users_id INNER JOIN schemes ON users_schemes.idSchemes = schemes.idSchemes INNER JOIN plans ON schemes.idplans = plans.idplans where schemes.deleted='0' AND users.users_id=?";
    con.query(sql, [userid], function (err, result) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/getBidDataforSchemes", async (req, res) => {
  const schemesid = req.body.schemesid;
  const con = await mysql.createConnection(CONNECTION_PARAM);
  await con.connect(function (err) {
    if (err)
      throw err;
    var sql = "SELECT b.id AS bidId, users.*, schemes.*, plans.*, b.* FROM schemes INNER JOIN plans ON schemes.idplans = plans.idplans INNER JOIN bids AS b ON schemes.idSchemes = b.idSchemes INNER JOIN users ON b.user_id = users.users_id WHERE schemes.deleted = '0' AND schemes.idSchemes = ? ORDER BY b.id DESC LIMIT 0, 5";
    con.query(sql, [schemesid], function (err, result) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/addUserBid", async (req, res) => {
  var datetime = new Date();

  const idSchemes = req.body.idSchemes;
  const user_id = req.body.userid;
  const fee = req.body.fee;
  const paid = req.body.paid;
  const won = 0;
  const created_at = datetime;

  const con = await mysql.createConnection(CONNECTION_PARAM);
  const date = getTodayDate();
  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO `bids` ( `idSchemes`,`user_id`,`fee`,`paid`,`won`,`created_at`) VALUES(?,?,?,?,?,?)";
    con.query(
      sql,
      [
        idSchemes,
        user_id,
        fee,
        paid,
        won,
        created_at
      ],
      function (err, result) {
        console.log(result);
        if (!result) {
          console.log("Bid Error");
          res.send({ message: "Bid Error",err:err });
        } else {
          console.log("1 record inserted", result);
          res.send({ message: "Bid added" });
        }
        con.destroy();
      }
    );
  });
});
app.get("/api/getTaxData", async (req, res) => {
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT * FROM `taxes` Where `deleted`='0'";
    con.query(sql, function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.get("/api/getNotificationData", async (req, res) => {
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT * FROM `notifications` Where `deleted`='0'";
    con.query(sql, function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.get("/api/getCompanyUsersData", async (req, res) => {
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql =
      "SELECT `companyusers`.`userid`,`companyusers`.`salutation`, concat(`companyusers`.`firstname`,' ' ,`companyusers`.`lastname`) `fullname`,`companyusers`.`cellphone`,`companyusers`.`alternateContact`, `companyusers`.`email`,`companyusers`.`gender`,  `companyusers`.`address`,`companyusers`.`country`,`companyusers`.`state`, `companyusers`.`city`, `companyusers`.`zipcode`,`companyusers`.`status`,`companyusers`.`createdAt`,`companyusers`.`type`,`companyusers`.`group`FROM `chitfund`.`companyusers` WHERE `companyusers`.`deleted`='0'";
    con.query(sql, function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.get("/api/getTotalUsersCount", async (req, res) => {
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql =
      "SELECT count(*) as totalUsers FROM `companyusers` WHERE `companyusers`.`deleted`='0'";
    con.query(sql, function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.get("/api/getTotalSchemeCount", async (req, res) => {
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT count(*) as totalSchemes FROM `schemes`";
    con.query(sql, function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.get("/api/getTotalGroupCount", async (req, res) => {
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT count(*) as totalGroups FROM `groups`";
    con.query(sql, function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/deleteCompanyUser", async (req, res) => {
  const userid = req.body.userid;
  console.log(userid);
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "UPDATE `companyusers` SET `deleted` = 1 WHERE `userid` = ?";
    con.query(sql, [userid], function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/deleteScheme", async (req, res) => {
  const idScheme = req.body.idSchemes;
  console.log(idScheme);
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "UPDATE `schemes` SET `deleted` = 1 WHERE `idSchemes` = ?";
    con.query(sql, [idScheme], function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/deleteGroup", async (req, res) => {
  const idGroup = req.body.idGroups;
  console.log(idGroup);
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "UPDATE `groups` SET `deleted` = 1 WHERE `idGroups` = ?";
    con.query(sql, [idGroup], function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

/* app.post("/api/deleteReport", async (req, res) => {
  const idReport = req.body.idReports;
  console.log(idReport);
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "UPDATE `reports` SET `deleted` = 1 WHERE `idReports` = ?";
    con.query(sql, [idReport], function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
}); */

app.post("/api/deleteTax", async (req, res) => {
  const idTax = req.body.idTaxes;
  console.log(idTax);
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "UPDATE `taxes` SET `deleted` = 1 WHERE `idTaxes` = ?";
    con.query(sql, [idTax], function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/deleteNotification", async (req, res) => {
  const idNotification = req.body.idNotifications;
  console.log(idNotification);
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql =
      "UPDATE `notifications` SET `deleted` = 1 WHERE `idNotifications` = ?";
    con.query(sql, [idNotification], function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/editCompanyUser", async (req, res) => {
  const data = req.body.data;
  const userid = req.body.data.userid;
  /* const fullname = req.body.data.fullname; */
  const email = req.body.data.email;
  const cellphone = req.body.data.cellphone;
  const state = req.body.data.state;
  const city = req.body.data.city;
  const type = req.body.data.type;
  const status = req.body.data.status;
  const group = req.body.data.group;

  console.log(data);
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql =
      "UPDATE `companyusers` SET  `email` = ? ,`cellphone` = ?,`state`=?,`city` = ?,`type`=? ,`status`=? , `group`=? WHERE `userid` = ?";
    con.query(
      sql,
      [email, cellphone, state, city, type, status, group, userid],
      function (err, result, fields) {
        if (result.length == 0) {
          console.log("No Data");
          res.send({ data: "No Data" });
        } else {
          res.send({ data: result });
        }
        con.destroy();
      }
    );
  });
});

app.post("/api/editScheme", async (req, res) => {
  const data = req.body.data;
  const idScheme = req.body.data.idSchemes;
  const schemeName = req.body.data.schemeName;
  const contactPerson = req.body.data.contactPerson;
  const contactNumber = req.body.data.contactNumber;
  const email = req.body.data.email;
  const maxAllowedUser = req.body.data.maxAllowedUser;
  const amountPerUser = req.body.data.amountPerUser;
  const terms = req.body.data.terms;
  const address = req.body.data.address;
  const country = req.body.data.country;
  const state = req.body.data.state;
  const city = req.body.data.city;
  const zipcode = req.body.data.zipcode;
  const description = req.body.data.description;
  const startDate = getFormatedDate(req.body.data.startDate);
  const endDate = getFormatedDate(req.body.data.endDate);
  const docURL = req.body.data.docURL;
  const status = req.body.data.status;

  console.log(data);
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql =
      "UPDATE `schemes` SET `schemeName` = ? , `contactPerson` = ? , `contactNumber` = ? , `email` = ? , `maxAllowedUser` = ? ,`amountPerUser` = ? , `terms` = ? ,`address` = ?,`country` = ? ,`state` = ?,`city` = ?,`zipcode` = ? ,`description` =? ,`startDate`=?,`endDate`=?,`docURL`=?,`status`=?   WHERE `idSchemes` = ?";
    con.query(
      sql,
      [
        schemeName,
        contactPerson,
        contactNumber,
        email,
        maxAllowedUser,
        amountPerUser,
        terms,
        address,
        country,
        state,
        city,
        zipcode,
        description,
        startDate,
        endDate,
        docURL,
        status,
        idScheme,
      ],
      function (err, result, fields) {
        if (result.length == 0) {
          console.log("No Data");
          res.send({ data: "No Data" });
        } else {
          res.send({ data: result });
        }
        con.destroy();
      }
    );
  });
});

app.post("/api/editSchemeCommissionRate", async (req, res) => {
  const data = req.body.data;
  const idScheme = req.body.data.idSchemes;
  const m1=req.body.data.m1;
  const m2=req.body.data.m2;
  const m3=req.body.data.m3;
  const m4=req.body.data.m4;
  const m5=req.body.data.m5;
  const m6=req.body.data.m6;
  const m7=req.body.data.m7;
  const m8=req.body.data.m8;
  const m9=req.body.data.m9;
  const m10=req.body.data.m10;
  const m11=req.body.data.m11;
  const m12=req.body.data.m12;

  console.log(data);
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql =
      "UPDATE `schemes` SET `m1` = ? , `m2` = ? , `m3` = ? , `m4` = ? ,`m5` = ? , `m6` = ?  , `m7` = ? ,`m8` = ? , `m9` = ? , `m10` = ? , `m11` = ? , `m12` = ?   WHERE `idSchemes` = ?";
    con.query(
      sql,
      [
        m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,idScheme,
      ],
      function (err, result, fields) {
        if (result.length == 0) {
          console.log("No Data");
          res.send({ data: "No Data" });
        } else {
          res.send({ data: result });
        }
        con.destroy();
      }
    );
  });
});

app.post("/api/editGroup", async (req, res) => {
  const GroupGroupId = req.body.data.idGroups;
  const GroupGroupName = req.body.data.groupName;
  const GroupContactPersonName = req.body.data.contactPerson;
  const GroupCellPhone = req.body.data.contactNumber;
  const GroupEmail = req.body.data.email;
  const GroupMaxAllowedUsers = req.body.data.maxUserAllowed;
  const GroupAmountPerUser = req.body.data.amountPerUser;
  const GroupTerms = req.body.data.terms;
  const GroupAddress = req.body.data.address;
  const GroupCountry = req.body.data.country;
  const GroupState = req.body.data.state;
  const GroupCity = req.body.data.city;
  const GroupZipcode = req.body.data.zipcode;
  const GroupStatus = req.body.data.status;
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "UPDATE  `groups`  SET  `contactPerson` = ? , `contactNumber` = ? , `email` = ? , `maxUserAllowed` = ? , `amountPerUser` = ? , `terms` = ?, `address`=?, `country`=?, `state`=?, `city`=?, `zipcode`=?, `status`=? Where `idGroups`=?";
    con.query(
      sql,
      [
        GroupContactPersonName,
        GroupCellPhone,
        GroupEmail,
        GroupMaxAllowedUsers,
        GroupAmountPerUser,
        GroupTerms,
        GroupAddress,
        GroupCountry,
        GroupState,
        GroupCity,
        GroupZipcode,
        GroupStatus,
        GroupGroupId,
      ],
      function (err, result, fields) {
        if (result.length == 0) {
          console.log("No Data");
          res.send({ data: "No Data" });
        } else {
          res.send({ data: result });
        }
        con.destroy();
      }
    );
  });
});

app.post("/api/editTax", async (req, res) => {
  const TaxTaxId = req.body.data.idTaxes;
  const TaxTaxType = req.body.data.taxType;
  const TaxTaxName = req.body.data.taxName;
  var TaxStartDate = getFormatedDate(req.body.data.startDate);
  var TaxEndDate = getFormatedDate(req.body.data.startDate);
  const TaxIncExc = req.body.data.exclusive_inclusive;
  const TaxTaxRate = req.body.data.taxRate;
  const TaxStatus = req.body.data.status;
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "UPDATE  `taxes` SET `taxType` = ? , `taxName` = ? , `startDate` = ? , `endDate` = ? , `exclusive_inclusive` = ?, `taxRate` = ?, `status` = ? WHERE `idTaxes` = ?";
    con.query(
      sql,
      [
        TaxTaxType,
        TaxTaxName,
        TaxStartDate,
        TaxEndDate,
        TaxIncExc,
        TaxTaxRate,
        TaxStatus,
        TaxTaxId,
      ],
      function (err, result, fields) {
        if (result.length == 0) {
          console.log("No Data");
          res.send({ data: "No Data" });
        } else {
          res.send({ data: result });
        }
        con.destroy();
      }
    );
  });
});

app.post("/api/editNotification", async (req, res) => {
  const NotificationNotificationId = req.body.data.idNotifications;
  const NotificationNotificationType = req.body.data.notificationType;
  const NotificationNotificationName = req.body.data.notificationName;
  const NotificationDetailMessage = req.body.data.detailMessage;
  const NotificationMedium = req.body.data.medium;
  const NotificationStatus = req.body.data.status;

  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "UPDATE  `notifications` SET `notificationType` = ?, `notificationName` = ?, `detailMessage` = ?, `medium` = ?, `status` = ?  Where `idNotifications` = ?";
    con.query(
      sql,
      [
        NotificationNotificationType,
        NotificationNotificationName,
        NotificationDetailMessage,
        NotificationMedium,
        NotificationStatus,
        NotificationNotificationId,
      ],
      function (err, result, fields) {
        if (result.length == 0) {
          console.log("No Data");
          res.send({ data: "No Data" });
        } else {
          res.send({ data: result });
        }
        con.destroy();
      }
    );
  });
});

app.post("/api/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(async function (err) {
    if (err) throw err;
    var sql = "SELECT * FROM users where email = ? and password = ?";
    await con.query(sql, [email, password], function (err, result, fields) {
      if (err) throw err;
      if (result.length == 1) {
        const userdata = {
          userid: result[0].users_id,
          fullname: result[0].fullname,
          email: result[0].email,
          password: password,
          role_id: result[0].role_id,
        };
        console.log(userdata);
        req.session.user = userdata;
        res.send({ message: "user exists", user: userdata  });
      }
      if (result.length == 0) {
        console.log("user does not exists", result.length);
        res.send({ message: "user does not exits"});
      }
      con.destroy();
    });
  });
});

app.post("/api/getDataforuser", async (req, res) => {
  const userid = req.body.userid;

  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(async function (err) {
    if (err) throw err;
    var sql = "SELECT * FROM users where users_id = ?";
    await con.query(sql, [userid], function (err, result, fields) {
      if (err) throw err;
      if (result.length == 0) {
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/changePassword", async (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  if (!req.session.user) {
    res.send({ message: "Session Expired" });
  } else if (oldPassword !== req.session.user.password) {
    res.send({ message: "You have entered wrong current password" });
  } else if (oldPassword === newPassword) {
    res.send({ message: "Please enter a different Password" });
  } else {
    const con = await mysql.createConnection(CONNECTION_PARAM);

    await con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "UPDATE  `users` SET `password` = ?  WHERE `email` = ?";
      con.query(
        sql,
        [newPassword, req.session.user.email],
        function (err, result, fields) {
          if (result.length == 0) {
            res.send({ message: "Error" });
          } else {
            req.session.user.password = newPassword;
            res.send({ message: "Password Update" });
          }
          con.destroy();
        }
      );
    });
  }
});

app.post("/api/get_settings", async (req, res) => {
  const key_str = req.body.name;
  

    const con = await mysql.createConnection(CONNECTION_PARAM);

    await con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "select * from  `settings`  WHERE `name` = ?";
      con.query(
        sql,[key_str],
        function (err, result, fields) {
          if (result.length == 0) {
            console.log("No Data");
            res.send({ data: "No Data" });
          } else {
            console.log("dataaaaaa",result);
            res.send({ data: result });
          }
          con.destroy();
        }
      );
    });
});

app.post("/api/set_settings", async (req, res) => {
  const key_str = req.body.name;
  const value_str = req.body.value;
    const con = await mysql.createConnection(CONNECTION_PARAM);
    await con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "UPDATE  `settings` SET `valus` = ?  WHERE `name` = ?";
      con.query(
        sql,
        [key_str, value_str],
        function (err, result, fields) {
          if (result.length == 0) {
            console.log("No Data");
            res.send({ data: "No Data" });
          } else {
            console.log("dataaaaaa",result);
            res.send({ data: result,message: "Value Update" });
          }
          con.destroy();
      
    });
  });
});
app.get("/api/getSchemeData", async (req, res) => {
  const con = await mysql.createConnection(CONNECTION_PARAM);

  await con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT * FROM `schemes` where `deleted`='0'";
    con.query(sql, function (err, result, fields) {
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/getSchemeDataForgUser", async (req, res) => {
  const users_id = req.body.users_id;
  console.log("u",req.body);
  const con = await mysql.createConnection(CONNECTION_PARAM);
  await con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT schemes.* FROM schemes INNER JOIN users_schemes ON schemes.idSchemes = users_schemes.idSchemes where schemes.deleted='0' AND users_schemes.users_id = ?";
    con.query(sql,[users_id], function (err, result, fields) {
      
      console.log(users_id);
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

app.post("/api/deleteSchemeForUser", async (req, res) => {
  const users_id = req.body.users_id;
  const idSchemes = req.body.idSchemes;
  
  const con = await mysql.createConnection(CONNECTION_PARAM);
  await con.connect(function (err) {
    
    if (err) throw err;
    var sql = "Delete FROM users_schemes where idSchemes = ? AND users_id = ?";
    con.query(sql,[idSchemes,users_id], function (err, result, fields) {
      
      console.log(users_id);
      if (result.length == 0) {
        console.log("No Data");
        res.send({ data: "No Data" });
      } else {
        res.send({ data: result });
      }
      con.destroy();
    });
  });
});

if (process.env.NODE_ENV === "production") {
  // js and css files

  app.use(express.static("client/build"));
  // index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
