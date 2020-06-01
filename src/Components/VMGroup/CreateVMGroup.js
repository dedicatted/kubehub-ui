import React, { useState } from 'react';
import { Container, Stepper, Step, StepLabel } from '@material-ui/core';
import { commonStyles } from "../../styles/style";
import { ChoseCloud } from './ChoseCloud';
import { SetName } from './SetName';
import { ValidateAndCreateVMGroup } from './ValidateAndCreateVMGroup';
import { MasterNodeConfig } from './MasterNodeConfig';
import { WorkerNodeConfig } from './WorkerNodeConfig';

export function CreateVMGroup (props) {
	const commonClasses = commonStyles();
	const [name, setName] = React.useState('');
	const [CPType, setCPType] = React.useState();
	const [activeStep, setActiveStep] = React.useState(0);
	const [masterImageOrTemplate, setMasterImageOrTemplate] = useState();
	const [masterVMType, setMasterVMType] = React.useState();
	const [numberOfMasterNodes, setNumberOfMasterNodes] = useState(0);
	const [workerImageOrTemplate, setWorkerImageOrTemplate] = useState();
	const [workerVMType, setWorkerVMType] = React.useState();
	const [numberOfWorkerNodes, setNumberOfWorkerNodes] = useState(0);
	const steps = ['Select cloud provider', 'Set name of virtual machine group', 'Set configurations for master nodes' ,'Set configurations for worker nodes', 'Validate and Create virtual machine group'];

	return (
		<React.Fragment>
			<Container maxWidth="xl" className={commonClasses.container}>
				<Stepper activeStep={activeStep} alternativeLabel>{
					steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))
				}</Stepper>
				{
					activeStep === 0
						? (
							<ChoseCloud
								setCPType={setCPType}
								setActiveStep={setActiveStep}
							/>
						) : activeStep === 1
							? (
								<SetName
									name={name}
									setName={setName}
									setActiveStep={setActiveStep}
								/>
							) : activeStep === 2
								? (
									<MasterNodeConfig
										masterImageOrTemplate={masterImageOrTemplate}
										masterVMType={masterVMType}
										setMasterImageOrTemplate={setMasterImageOrTemplate}
										setMasterVMType={setMasterVMType}
										setActiveStep={setActiveStep}
										numberOfMasterNodes={numberOfMasterNodes}
										setNumberOfMasterNodes={setNumberOfMasterNodes}
										CPType={CPType}
									/>
								)
								: activeStep === 3
									? (
										<WorkerNodeConfig
											workerImageOrTemplate={workerImageOrTemplate}
											workerVMType={workerVMType}
											setWorkerImageOrTemplate={setWorkerImageOrTemplate}
											setWorkerVMType={setWorkerVMType}
											setActiveStep={setActiveStep}
											numberOfWorkerNodes={numberOfWorkerNodes}
											setNumberOfWorkerNodes={setNumberOfWorkerNodes}
											masterImageOrTemplate={masterImageOrTemplate}
											CPType={CPType}
										/>
									)
									: activeStep === 4
										? (
											<ValidateAndCreateVMGroup
												CPType={CPType}
												name={name}
												workerImageOrTemplate={workerImageOrTemplate}
												workerVMType={workerVMType}
												masterImageOrTemplate={masterImageOrTemplate}
												masterVMType={masterVMType}
												getVMGroups={props.getVMGroups}
												numberOfMasterNodes={numberOfMasterNodes}
												numberOfWorkerNodes={numberOfWorkerNodes}
											/>
										)
										: null
				}
			</Container>
		</React.Fragment>
	);
};
