/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 

 * 
 */

/**
 * A toekn has been transfered
 * @param {org.education.InitUser} initUser - the TokenTransfer transaction
 * @transaction
 */
function  inituser(initUser) {
    var factory = getFactory();
    var NS = 'org.education';
    // create the grower
    var user1 = factory.newResource(NS, 'User', 'user1@email.com');
    user1.accountBalance = 10;
    var user2 = factory.newResource(NS, 'User', 'test1@qq.com');
    user2.accountBalance = 110;
    var user3 = factory.newResource(NS, 'User', 'test@qq.com');
    user3.accountBalance = 220;
    var user4 = factory.newResource(NS, 'User', 'test2@qq.com');
    user4.accountBalance = 330;

    return getParticipantRegistry(NS + '.User')
        .then(function (UserRegistry) {
            // add the growers
            return UserRegistry.addAll([user1,user2,user3,user4]);
        });
}


/**
 * A toekn has been transfered
 * @param {org.education.InitCentralBank} initCentralBank - the TokenTransfer transaction
 * @transaction
 */
function  initcentralbank(initCentralBank) {
    var factory = getFactory();
    var NS = 'org.education';
    // create the grower
    var centralbank = factory.newResource(NS, 'CentralBank', 'centralbank@email.com');
    centralbank.accountBalance = 0;
    centralbank.totalIssueToken = 0;
    centralbank.totalWithdrawToken = 0;

    return getParticipantRegistry(NS + '.CentralBank')
        .then(function (centralbankRegistry) {
            // add the growers
            return centralbankRegistry.addAll([centralbank]);
        });
}

/**
 * A toekn has been transfered
 * @param {org.education.InitCompany} initCompany - the TokenTransfer transaction
 * @transaction
 */
function  initcompany(initCompany) {
    var factory = getFactory();
    var NS = 'org.education';
    // create the grower
    var company1 = factory.newResource(NS, 'Company', 'ZjuEducation@email.com');
    company1.accountBalance = 100000;
    company1.registrationNumber = 'regitser#1';
    var company2 = factory.newResource(NS, 'Company', 'mooc@email.com');
    company2.accountBalance = 10;
    company2.registrationNumber = 'regitser#2';

    return getParticipantRegistry(NS + '.Company')
        .then(function (CompanyRegistry) {
            // add the growers
            return CompanyRegistry.addAll([company1,company2]);
        });
}

/**
 * A toekn has been transfered
 * @param {org.education.InitContract} initContract - the TokenTransfer transaction
 * @transaction
 */
function  initcontract(initContract) {
    var factory = getFactory();
    var NS = 'org.education';

    var contract = factory.newResource(NS, 'Contract', 'contract@mooc');
    contract.platformPer = 0.003;
    contract.companyPer = 0.997;

    return getAssetRegistry(NS + '.Contract')
        .then(function (ContractRegistry) {
            // add the growers
            return ContractRegistry.addAll([contract]);
        });
}


/**
 * A toekn has been transfered
 * @param {org.education.InitService} initService - the TokenTransfer transaction
 * @transaction
 */
function  initservice(initService) {
    var factory = getFactory();
    var NS = 'org.education';

    var service1 = factory.newResource(NS, 'Service', 'service1@mooc');
    service1.serviceName = '微积分课程';
    service1.readPrice = 25.5;
    service1.ownershipPrice = 10025.5;
    service1.company = factory.newRelationship(NS, 'Company', 'mooc@email.com');
    
    var service2 = factory.newResource(NS, 'Service', 'service2@mooc');
    service2.serviceName = '高数课程';
    service2.readPrice = 35.5;
    service2.ownershipPrice = 1025.5;
    service2.company = factory.newRelationship(NS, 'Company', 'mooc@email.com');
    
    var service3 = factory.newResource(NS, 'Service', 'service3@mooc');
    service3.serviceName = '操作系统课程';
    service3.readPrice = 20.5;
    service3.ownershipPrice = 125.5;
    service3.company = factory.newRelationship(NS, 'Company', 'mooc@email.com');


    return getAssetRegistry(NS + '.Service')
        .then(function (ServiceRegistry) {
            // add the growers
            return ServiceRegistry.addAll([service2,service3,service1]);
        });
}




/**
 * A toekn has been transfered
 * @param {org.education.TokenTransferU_U} tokenTransferU_U - the TokenTransfer transaction
 * @transaction
 */
function transfertokenU_U(tokenTransferU_U) {
    var fromUser = tokenTransferU_U.fromuser;
    var toUser = tokenTransferU_U.to;
    var transferTokennum = tokenTransferU_U.transferNum;
    var NS = 'org.education';

    if (transferTokennum >= fromUser.accountBalance) {
        throw new Error('Transfer account should have enough balance.');
    }
    userArray = new Array();
    fromUser.accountBalance -= transferTokennum;
    toUser.accountBalance += transferTokennum;
    userArray.push(fromUser);
    userArray.push(toUser);
    return getParticipantRegistry(NS + '.User')
        .then(function (UserRegistry) {
            return UserRegistry.updateAll(userArray);
        });
}
 
/**
 * A toekn has been transfered
 * @param {org.education.TokenTransferU_C} tokenTransferU_C - the TokenTransfer transaction
 * @transaction
 */
async function tokentransferU_C(tokenTransferU_C) {
    var fromUser = tokenTransferU_C.fromuser;
    var toCompany = tokenTransferU_C.to;
    var transferTokennum = tokenTransferU_C.transferNum;
    var NS = 'org.education';

    if (transferTokennum >= fromUser.accountBalance) {
        throw new Error('Transfer account should have enough balance.');
    }

    fromUser.accountBalance -= transferTokennum;
    toCompany.accountBalance += transferTokennum;

    const UserRegistry = await getParticipantRegistry(NS + '.User');
    await UserRegistry.update(fromUser);
    const CompanyRegistry = await getParticipantRegistry(NS + '.Company');
    await CompanyRegistry.update(toCompany);
}






/**
 * A toekn has been transfered
 * @param {org.education.UserRecharge} userRecharge - the userRecharge transaction
 * @transaction
 */
async function  userrecharge(userRecharge) {
    var NS = 'org.education';
    var factory = getFactory();
    var usertokenrecharge = factory.newResource(NS, 'UserTokenRecharge', userRecharge.rechargeID);
    usertokenrecharge.tokenNum = userRecharge.tokenNum;
    usertokenrecharge.user = userRecharge.user;
    usertokenrecharge.confirmBank = 'N';


    return getAssetRegistry(NS + '.UserTokenRecharge')
        .then(function (UserTokenRechargeRegistry) {
            // update the grower's balance
            return UserTokenRechargeRegistry.addAll([usertokenrecharge]);
        });

}


/**
 * 管理员同意充值 rechargeID
 * @param {org.education.CheckUserRecharge} checkuserRecharge 
 * @transaction
 */
async function  checkuserrecharge(checkuserRecharge) {
    var NS = 'org.education';
    var usertokenrecharge = checkuserRecharge.rechargeID;
    usertokenrecharge.confirmBank = 'Y';
    usertokenrecharge.paymentid = checkuserRecharge.paymentid;

    // 硬编码bank  bank总发行量增加
    
    const CentralBankRegistry = await getParticipantRegistry(NS + '.CentralBank');
    const bank = await CentralBankRegistry.get('centralbank@email.com');
    
    bank.totalIssueToken += usertokenrecharge.tokenNum;
    usertokenrecharge.user.accountBalance += usertokenrecharge.tokenNum;
        
    await CentralBankRegistry.update(bank);

    const UserRegistry = await getParticipantRegistry(NS + '.User');
    await UserRegistry.update(usertokenrecharge.user);

    const UserTokenRechargeRegistry = await getAssetRegistry(NS + '.UserTokenRecharge');
    await UserTokenRechargeRegistry.update(usertokenrecharge);

}

/**
 * 管理员同意拒绝 rechargeID
 * @param {org.education.RejectUserRecharge} rejectUserRecharge 
 * @transaction
 */
async function  rejectUserRecharge(rejectRequest) {
    var NS = 'org.education';
    var usertokenrecharge = rejectRequest.rechargeID;
    usertokenrecharge.confirmBank = 'R';   

    const UserTokenRechargeRegistry = await getAssetRegistry(NS + '.UserTokenRecharge');
    await UserTokenRechargeRegistry.update(usertokenrecharge);

}



/**
 * A toekn has been transfered
 * @param {org.education.CompanyWithdraw} companyWithdraw - the companyWithdraw transaction
 * @transaction
 */
async function  companywithdraw(companyWithdraw) {
    var NS = 'org.education';
    var factory = getFactory();
    var companywithdraw = factory.newResource(NS, 'CompanyTokenWithdraw', companyWithdraw.tokenWithdrawID);
    companywithdraw.tokenNum = companyWithdraw.tokenNum;
    companywithdraw.company = companyWithdraw.company;
    companywithdraw.confirmBank = 'N';

    return getAssetRegistry(NS + '.CompanyTokenWithdraw')
        .then(function (CompanyTokenWithdrawRegistry) {
            // update the grower's balance
            return CompanyTokenWithdrawRegistry.addAll([companywithdraw]);
        });

}


/**
 * 管理员同意提现 tokenWithdrawID
 * @param {org.education.CheckCompanyWithdraw} checkCompanyWithdraw 
 * @transaction
 */
async function  checkcompanywithdraw(checkCompanyWithdraw) {
    var NS = 'org.education';
    var CompanyTokenWithdraw = checkCompanyWithdraw.tokenWithdrawID;
    CompanyTokenWithdraw.confirmBank = 'Y';
    CompanyTokenWithdraw.paymentid = checkCompanyWithdraw.paymentid;

    // 硬编码bank  bank总提现量增加
    if (CompanyTokenWithdraw.tokenNum > CompanyTokenWithdraw.company.accountBalance) {
        throw new Error('Company should have enough balance.');
    }

    const CentralBankRegistry = await getParticipantRegistry(NS + '.CentralBank');
    const bank = await CentralBankRegistry.get('centralbank@email.com');
    
    bank.totalWithdrawToken += CompanyTokenWithdraw.tokenNum;
    CompanyTokenWithdraw.company.accountBalance -= CompanyTokenWithdraw.tokenNum;
        
    await CentralBankRegistry.update(bank);

    const CompanyRegistry = await getParticipantRegistry(NS + '.Company');
    await CompanyRegistry.update(CompanyTokenWithdraw.company);

    const CompanyTokenWithdrawRegistry = await getAssetRegistry(NS + '.CompanyTokenWithdraw');
    await CompanyTokenWithdrawRegistry.update(CompanyTokenWithdraw);

}

/**
 * 管理员拒绝提现请求 tokenWithdrawID
 * @param {org.education.RejectCompanyWithdraw} rejectCompanyWithdraw 
 * @transaction
 */
async function  rejectcompanywithdraw(rejectCompanyWithdraw) {
    var NS = 'org.education';
    var CompanyTokenWithdraw = rejectCompanyWithdraw.tokenWithdrawID;
    CompanyTokenWithdraw.confirmBank = 'R';   

    const CompanyTokenWithdrawRegistry = await getAssetRegistry(NS + '.CompanyTokenWithdraw');
    await CompanyTokenWithdrawRegistry.update(CompanyTokenWithdraw);

}







/**
 * 
 * @param {org.education.UserConsumeService} userConsumeService - the userConsumeService transaction
 * @transaction
 */

 
async function userconsumeservice(userConsumeService) {
    var service = userConsumeService.serviceID;
    var user = userConsumeService.user;
    var NS = 'org.education';
    // 硬编码 contract  bank
    var company = service.company;

    const CentralBankRegistry = await getParticipantRegistry(NS + '.CentralBank');
    const bank = await CentralBankRegistry.get('centralbank@email.com');
    
    const contractRegistry = await getAssetRegistry(NS + '.Contract');
    const contract = await contractRegistry.get('contract@mooc');
       
    if (service.readPrice > user.accountBalance) {
        throw new Error('User should have enough balance.');
    }
     
    //权益分配
    var price = service.readPrice;
    user.accountBalance -= price;
    bank.accountBalance += contract.platformPer * price;
    company.accountBalance += contract.companyPer * price;


    return getParticipantRegistry(NS + '.User')
        .then(function (UserRegistry) {
            // update the grower's balance
            return UserRegistry.update(user);
        })
        .then(function () {
            return getParticipantRegistry(NS + '.Company');
        })
        .then(function (CompanyRegistry) {
            // update the importer's balance
            return CompanyRegistry.update(company);
        })
        .then(function () {
            return getParticipantRegistry(NS + '.CentralBank');
        })
        .then(function (CentralBankRegistry) {
            // update the importer's balance
            return CentralBankRegistry.update(bank);
        });
}



/**
 * 
 * @param {org.education.CompanyBuyOnwership} companyBuyOnwership - the userConsumeService transaction
 * @transaction
 */

 
async function companybuyonwership(companyBuyOnwership) {
    var service = companyBuyOnwership.serviceID;
    var buyercompany = companyBuyOnwership.company;
    var NS = 'org.education';
    // 硬编码 contract  bank
    var ownercompany = service.company;

    const CentralBankRegistry = await getParticipantRegistry(NS + '.CentralBank');
    const bank = await CentralBankRegistry.get('centralbank@email.com');
    
    const contractRegistry = await getAssetRegistry(NS + '.Contract');
    const contract = await contractRegistry.get('contract@mooc');
       
    if (service.ownershipPrice > buyercompany.accountBalance) {
        throw new Error('User should have enough balance.');
    }
     
    //权益分配
    var price = service.ownershipPrice;
    buyercompany.accountBalance -= price;
    bank.accountBalance += contract.platformPer * price;
    ownercompany.accountBalance += contract.companyPer * price;
    service.company = buyercompany;

    companyArray = new Array();
    companyArray.push(ownercompany);
    companyArray.push(buyercompany);

    return getParticipantRegistry(NS + '.Company')
        .then(function (CompanyRegistry) {
            // update the grower's balance
            return CompanyRegistry.updateAll(companyArray);
        })
        .then(function () {
            return getParticipantRegistry(NS + '.CentralBank');
        })
        .then(function (CentralBankRegistry) {
            // update the importer's balance
            return CentralBankRegistry.update(bank);
        })
        .then(function () {
            return getAssetRegistry(NS + '.Service');
        })
        .then(function (ServiceRegistry) {
            // update the importer's balance
            return ServiceRegistry.update(service);
        });
}




/**
 * A toekn has been transfered
 * @param {org.education.RegisterUser} registerUser - the TokenTransfer transaction
 * @transaction
 */
function  registeruser(registerUser) {
    var factory = getFactory();
    var NS = 'org.education';
    // create the grower
    var user1 = factory.newResource(NS, 'User', registerUser.email);
    user1.password = registerUser.password;
    user1.Fingerprint = registerUser.Fingerprint;
    user1.Iris = registerUser.Iris;
    user1.accountBalance = 0;
    return getParticipantRegistry(NS + '.User')
        .then(function (UserRegistry) {
            // add the growers
            return UserRegistry.addAll([user1]);
        });
}


/**
 * A toekn has been transfered
 * @param {org.education.RegisterCompany} registerCompany - the TokenTransfer transaction
 * @transaction
 */
function  registercompany(registerCompany) {
    var factory = getFactory();
    var NS = 'org.education';
    // create the grower
    var company1 = factory.newResource(NS, 'Company', registerCompany.email);
    company1.accountBalance = 0;
    company1.registrationNumber = registerCompany.registrationNumber;
    company1.password = registerCompany.password;
    company1.Fingerprint = registerCompany.Fingerprint;
    company1.Iris = registerCompany.Iris;

    return getParticipantRegistry(NS + '.Company')
        .then(function (CompanyRegistry) {
            // add the growers
            return CompanyRegistry.addAll([company1]);
        });
}


/**
 * A toekn has been transfered
 * @param {org.education.RegisterRegulator} registerRegulator - the TokenTransfer transaction
 * @transaction
 */
function  registerregulator(registerRegulator) {
    var factory = getFactory();
    var NS = 'org.education';
    // create the grower
    var user1 = factory.newResource(NS, 'Regulator', registerRegulator.email);
    user1.password = registerRegulator.password;
    user1.Fingerprint = registerRegulator.Fingerprint;
    user1.Iris = registerRegulator.Iris;
    user1.accountBalance = 0;
    return getParticipantRegistry(NS + '.Regulator')
        .then(function (RegulatorRegistry) {
            // add the growers
            return RegulatorRegistry.addAll([user1]);
        });
}


/**
 * A toekn has been transfered
 * @param {org.education.UpdateUserpassword} updateUserpassword - the TokenTransfer transaction
 * @transaction
 */
async function  updateuserpassword(updateUserpassword) {
    var NS = 'org.education';
    const UserRegistry = await getParticipantRegistry(NS + '.User');
    const user = await UserRegistry.get(updateUserpassword.email);
    user.password = updateUserpassword.password;
    await UserRegistry.update(user);
}

/**
 * A toekn has been transfered
 * @param {org.education.UpdateUserFingerprint} updateUserFingerprint - the TokenTransfer transaction
 * @transaction
 */
async function  updateuserFingerprint(updateUserFingerprint) {
    var NS = 'org.education';
    const UserRegistry = await getParticipantRegistry(NS + '.User');
    const user = await UserRegistry.get(updateUserFingerprint.email);
    user.Fingerprint = updateUserFingerprint.Fingerprint;
    await UserRegistry.update(user);
}

/**
 * A toekn has been transfered
 * @param {org.education.UpdateUserIris} updateUserIris - the TokenTransfer transaction
 * @transaction
 */
async function  updateuserIris(updateUserIris) {
    var NS = 'org.education';
    const UserRegistry = await getParticipantRegistry(NS + '.User');
    const user = await UserRegistry.get(updateUserIris.email);
    user.Iris = updateUserIris.Iris;
    await UserRegistry.update(user);
}


/**
 * A toekn has been transfered
 * @param {org.education.RegisterService} registerService - the TokenTransfer transaction
 * @transaction
 */
function  registerservice(registerService) {
    var NS = 'org.education';
    var factory = getFactory();
    var service1 = factory.newResource(NS, 'Service', registerService.serviceID);
    service1.serviceName = registerService.serviceName;
    service1.readPrice = registerService.readPrice;
    service1.ownershipPrice = registerService.ownershipPrice;
    service1.company = registerService.company;

    return getAssetRegistry(NS + '.Service')
        .then(function (ServiceRegistry) {
            // add the growers
            return ServiceRegistry.addAll([service1]);
        });
}


/**
 * A toekn has been transfered
 * @param {org.education.UpdateServicereadPrice} updateServicereadPrice - the TokenTransfer transaction
 * @transaction
 */
async function  updateservicereadPrice(updateServicereadPrice) {
    var NS = 'org.education';
    const ServiceRegistry = await getAssetRegistry(NS + '.Service');
    const service1 = await ServiceRegistry.get(updateServicereadPrice.serviceID);
    service1.readPrice = updateServicereadPrice.readPrice;
    await ServiceRegistry.update(service1);
}

/**
 * A toekn has been transfered
 * @param {org.education.UpdateServiceownershipPrice} updateServiceownershipPrice - the TokenTransfer transaction
 * @transaction
 */
async function  updateserviceownershipPrice(updateServiceownershipPrice) {
    var NS = 'org.education';
    const ServiceRegistry = await getAssetRegistry(NS + '.Service');
    const service1 = await ServiceRegistry.get(updateServiceownershipPrice.serviceID);
    service1.ownershipPrice = updateServiceownershipPrice.ownershipPrice;
    await ServiceRegistry.update(service1);
}






