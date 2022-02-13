const AWS = require('aws-sdk');
const instances = require('./instances.json');

const main = async () => {
    const ec2 = new AWS.EC2({ region: "ap-south-1", credentials: new AWS.SharedIniFileCredentials({ profile: 'anyProfile' }) });
    
    for(const instance of instances) {
        await ec2.modifyInstanceAttribute({
            InstanceId: instance.instanceId,
            DisableApiTermination: {
                Value: true
            }
        }).promise();

        console.log(`Instance ${instance.name} is now protected`);
    }
}

main();
