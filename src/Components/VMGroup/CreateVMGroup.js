import React, { useState } from 'react';
import { Container, Stepper, Step, StepLabel } from '@material-ui/core';
import { commonStyles } from "../../styles/style";
import { StepChoseCloud } from './StepChoseCloud';
import { StepSetConfig } from './StepSetConfig';
import { StepValidateAndCreate } from './StepValidateAndCreate';

export function CreateVMGroup (props) {
	const commonClasses = commonStyles();
	const [name, setName] = React.useState('');
	const [CPType, setCPType] = React.useState();
	const [numberOfNodes, setNumberOfNodes] = React.useState('');
	const [VMType, setVMType] = React.useState('');
	const [imageOrTemplate, setImageOrTemplate] = useState('');
	const [diskSize, setDiskSize] = useState('')
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = ['Select cloud provider', 'Set config of virtual machine group', 'Validate and Create virtual machine group'];

	return (
		<React.Fragment>
			<Container maxWidth="xl" className={commonClasses.container}>
				<Stepper activeStep={activeStep}>{
					steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))
				}</Stepper>
				{
					activeStep === 0
						? (
							<StepChoseCloud
								setCPType={setCPType}
								setActiveStep={setActiveStep}
							/>
						) : activeStep === 1
							? (
								<StepSetConfig
									name={name}
									setName={setName}
									imageOrTemplate={imageOrTemplate}
									setImageOrTemplate={setImageOrTemplate}
									numberOfNodes={numberOfNodes}
									setNumberOfNodes={setNumberOfNodes}
									VMType={VMType}
									setVMType={setVMType}
									diskSize={diskSize}
									setDiskSize={setDiskSize}
									setActiveStep={setActiveStep}
								/>
							) : activeStep === 2
									? (
										<StepValidateAndCreate
											CPType={CPType}
											getVMGroups={props.getVMGroups}
											numberOfNodes={numberOfNodes}
											imageOrTemplate={imageOrTemplate}
											setActiveStep={setActiveStep}
											name={name}
											VMType={VMType}
											diskSize={diskSize}
										/>
									)
									: null

				}
			</Container>
		</React.Fragment>
	);
};
