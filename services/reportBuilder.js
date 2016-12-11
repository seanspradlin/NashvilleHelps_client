(function(){
    angular.module('nashhelps')
        .factory('reportBuilder', reportBuilder);
    
    reportBuilder.$inject = ['clientService', 'agencyService', 'servicesService'];

    function reportBuilder(clientService, agencyService, servicesService){
        var clients = [];
        var agencies = [];
        var services = [];
        var report;
        function init(){
            return clientService.getClients()
                .then(function(res){
                    clients = res;
                    return agencyService.getAgencies()
                        .then(function(res){
                            agencies = res;
                            return servicesService.getServices()
                                .then(function(res){
                                    services = res;
                                    return res;
                                })
                        })
                })
        }

        function generateReport(){
            return init().then(function(){
                report = {
                    clients: [],
                    services: [],
                    agencies: [],
                    client :{
                        total: clients.length
                    }
                };
                report.clients = generateClientArray();
                report.services = generateServiceArray();
                report.agencies = generateAgencyArray();
                report.client.averageCompletion = findClientAverage();
                report.client.totalFulfilled = findClientFulfilled();
                
                return report;
            });
            
        }


        //SERVICES

        function findServiceFulfilledTotal(referrals){
            return referrals.filter(function(v){
                    return v.fulfilled
                }).length
        }


        function findServiceTimes(referrals){
            console.log(referrals)
            var times = {};
            var today = new Date();
            var month = today.getMonth();
            var year = today.getFullYear(); 
            var quarter = Math.floor(month/4);
            var quarterMonths = [0,3,6,9];

            times.thisMonth = getForDays(new Date(year, month), referrals);
            times.thisQuarter = getForDays(new Date(year, quarterMonths[quarter]), referrals);
            times.thisYear = getForDays(new Date(year, 0), referrals);
            times.allTime = referrals;
            return times;
        }

        function getForDays(date, referrals){
            return referrals.filter(function(v){
                return (date - new Date(v.dateRequested)) < 0; 
            });
        }

        function generateServiceArray(){
            var servicesArr = services;
            report.clients.forEach(function(v){
                var index = servicesArr.findIndex(function(s){
                    return s._id == v.service._id;
                })
                if (index > -1){
                    if (!servicesArr[index].referrals){
                        servicesArr[index].referrals = [];
                    }
                    servicesArr[index].referrals.push(v);
                }
            });

            servicesArr = servicesArr.map(function(v){
                v.agencies = getAgenciesForService(v._id);
                return v;
            });

            servicesArr = servicesArr.map(function(v){
                v.times = findServiceTimes(v.referrals);
                v.total = findServiceFulfilledTotal(v.referrals);
                return v;
            })
            return servicesArr;
        }

        function getAgenciesForService(id){
            return agencies.filter(function(v){
                return v.services.some(function(e){
                    return e._id == id;
                })
            })
        }
        
        
        
        //AGENCIES
        
        
        function generateAgencyArray(){
            var agenciesArr = [];
            agencies.forEach(function(v){
                agenciesArr = agenciesArr.concat(
                    v.services.map(function(s){
                        return {
                            _id: v._id,
                            name: v.name,
                            phone: v.phone,
                            address: v.address,
                            service: s
                        }
                    })
                );
            });            
            agenciesArr = agenciesArr.map(function(v){
                v.times = findServiceTimes(generateAgencyTotals(v));
                return v;
            });
                console.log(agenciesArr)
                return agenciesArr;
        }
        
        function generateAgencyTotals(service){
            return report.clients.filter(function(v){
                if (v.agency && v.service){
                    return v.agency._id == service._id && v.service._id == service.service._id
                }
            });
            
        }





        //CLIENTS

        function findClientFulfilled(){
            return report.clients.filter(function(v){
                return v.fulfilled
            }).length;
        }

        function findClientAverage(){
            var completions = [];
            clients.forEach(function(v){
                if (v.is_fulfilled){
                    var ref = generateReferrals(v);
                    ref.forEach(function(e){
                        completions.push({
                            dateRequested: e.dateRequested,
                            dateCompleted: v.date_completed
                        });
                    })
                }
            });
            var completionTime = completions.map(function(v){
                return (new Date(v.dateCompleted) - new Date(v.dateRequested))/86400000 //strips milliseconds to days 1000 sec * 60 min * 60 hours * 24 days
            });
            var average = 0;
            var total = 0;
            completionTime.forEach(function(v){
                if (!isNaN(v)){
                    average = average + v;
                    total++;
                }
            })
            return Math.round(average/total);
        }

        function generateClientArray(){
            var referrals = [];
            clients.forEach(function(v){
                var ref = generateReferrals(v);
                referrals = referrals.concat(ref);
            });

            
            return referrals;
        }
        function generateReferrals(client){
            return client.referrals.map(function(v){
                var referral = {
                    name: client.name,
                    postal: client.address.postal,
                    service: {
                        name: v.service_name,
                        _id: v.service
                    },
                    fulfilled: v.is_complete,
                    agency: getAgency(v.agency),
                    dateRequested: new Date(v.requested).toDateString()
                };
                return referral;
            });
        }

        function getAgency(agencyId){
            if (!agencyId) { return; }
            return agencies.find(function(a){
                return a._id == agencyId;
            })
        }

        return {
            generateReport: generateReport
        };
    }
})();