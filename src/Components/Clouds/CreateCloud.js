import React, { useState } from "react";
import { Stepper, Step, StepLabel, Container } from "@material-ui/core";
import { ChoseCPtype } from "./ChoseCPtype";
import { CloudConfig } from "./CloudConfig";
import { commonStyles } from '../../styles/style';
import { ValidateAndCreateCloud } from "./ValidateAndCreateCloud";

export default function CreateCloud (props) {
	const commonClasses = commonStyles();
	const [CPType, setCPType] = useState("");
	const [name, setName] = useState("");
	const [apiEndpoint, setApiEndpoint] = useState("");
	const [password, setPassword] = useState("");
	const [sharedStorageName, setSharedStorageName] = useState('');
	const [activeStep, setActiveStep] = useState(0);
	const steps = ['Chose cloud provider type', 'Set configurations of cloud provider' , 'Validate and Create Cloud'];
	const [virtualBoxImageFolder, setVirtualBoxImagefolder] = useState('');



	return (
		<Container className={commonClasses.container}>
			<Stepper activeStep={activeStep} alternativeLabel>{
				steps.map(lable => (
					<Step key={lable}>
						<StepLabel>{lable}</StepLabel>
					</Step>
				))
			}</Stepper>
			{
				activeStep === 0
					? (
						<ChoseCPtype
							setActiveStep={setActiveStep}
							setCPType={setCPType}
						/>
					)
					: activeStep === 1
						? (
							<CloudConfig
								setName={setName}
								setApiEndpoint={setApiEndpoint}
								setPassword={setPassword}
								setSharedStorageName={setSharedStorageName}
								name={name}
								apiEndpoint={apiEndpoint}
								password={password}
								sharedStorageName={sharedStorageName}
								setActiveStep={setActiveStep}
								CPType={CPType}
								virtualBoxImageFolder={virtualBoxImageFolder}
								setVirtualBoxImagefolder={setVirtualBoxImagefolder}
							/>
						)
						: activeStep === 2
							? (
								<ValidateAndCreateCloud
									name={name}
									apiEndpoint={apiEndpoint}
									password={password}
									CPType={CPType}
									sharedStorageName={sharedStorageName}
									virtualBoxImageFolder={virtualBoxImageFolder}
									getClouds={props.getClouds}
									setActiveStep={setActiveStep}
								/>
							)
							: null
			}
			</Container>
	);
};
