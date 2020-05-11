import React, { useState, useEffect } from 'react';
import {  Container,  Stepper, Step, StepLabel } from '@material-ui/core';
import { commonStyles } from "../../styles/style";
import { ClusterBasicConfig } from './ClusterBasicConfig';
import { MasterNodeConfig } from '../VMGroup/MasterNodeConfig';
import { WorkerNodeConfig } from '../VMGroup/WorkerNodeConfig';
import { ValidateAndCreateCluster } from './ValidateAndCreateCluster';

export function CreateCluster (props) {
	const commonClasses = commonStyles();
	const [advancedConfig, setAdvancedConfig] = useState(false);
	const [clusterName, setClusterName] = useState('');
	const [CPType, setCPType] = React.useState('');
	const [kubernetesVersionId, setkubernetesVersionId] = useState('');
	const [VMGname, setVMGname] = useState('');
	const [masterImageOrTemplate, setMasterImageOrTemplate] = useState();
	const [masterVMType, setMasterVMType] = React.useState('');
	const [masterDiskSize, setMasterDiskSize] = useState('');
	const [numberOfMasterNodes, setNumberOfMasterNodes] = useState(0);
	const [workerImageOrTemplate, setWorkerImageOrTemplate] = useState();
	const [workerVMType, setWorkerVMType] = React.useState('');
	const [workerDiskSize, setWorkerDiskSize] = useState(0);
	const [numberOfWorkerNodes, setNumberOfWorkerNodes] = useState(0);
	const [selectedVMGroup, setSelectedVMGroup] = useState('');
	const [activeStep, setActiveStep] = useState(0);
	const steps = ['Set basic configurations', 'Set configurations for master nodes' ,'Set configurations for worker nodes', 'Validate and Create Cluster'];

	useEffect(props.getVMGroups, []);
	useEffect(props.getClusters, []);

	return (
		<Container maxWidth='xl' className={commonClasses.container}>
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
						<ClusterBasicConfig
							advancedConfig={advancedConfig}
							setAdvancedConfig={setAdvancedConfig}
							clusterName={clusterName}
							kubernetesVersionId={kubernetesVersionId}
							setClusterName={setClusterName}
							setkubernetesVersionId={setkubernetesVersionId}
							setActiveStep={setActiveStep}
							selectedVMGroup={selectedVMGroup}
							setSelectedVMGroup={setSelectedVMGroup}
							VMGname={VMGname}
							setVMGname={setVMGname}
							CPType={CPType}
							setCPType={setCPType}
							steps={steps}
						/>
					)
					: activeStep === 1
						? (
							<MasterNodeConfig
								masterImageOrTemplate={masterImageOrTemplate}
								masterVMType={masterVMType}
								masterDiskSize={masterDiskSize}
								setMasterImageOrTemplate={setMasterImageOrTemplate}
								setMasterVMType={setMasterVMType}
								setMasterDiskSize={setMasterDiskSize}
								setActiveStep={setActiveStep}
								numberOfMasterNodes={numberOfMasterNodes}
								setNumberOfMasterNodes={setNumberOfMasterNodes}
							/>
						)
						: activeStep === 2
							? (
								<WorkerNodeConfig
									workerDiskSize={workerDiskSize}
									workerImageOrTemplate={workerImageOrTemplate}
									workerVMType={workerVMType}
									setWorkerDiskSize={setWorkerDiskSize}
									setWorkerImageOrTemplate={setWorkerImageOrTemplate}
									setWorkerVMType={setWorkerVMType}
									setActiveStep={setActiveStep}
									numberOfWorkerNodes={numberOfWorkerNodes}
									setNumberOfWorkerNodes={setNumberOfWorkerNodes}
									masterImageOrTemplate={masterImageOrTemplate}
								/>
							)
							: activeStep === 3
								? (
									<ValidateAndCreateCluster
										advancedConfig={advancedConfig}
										setActiveStep={setActiveStep}
										workerDiskSize={workerDiskSize}
										workerImageOrTemplate={workerImageOrTemplate}
										workerVMType={workerVMType}
										clusterName={clusterName}
										kubernetesVersionId={kubernetesVersionId}
										masterImageOrTemplate={masterImageOrTemplate}
										masterVMType={masterVMType}
										masterDiskSize={masterDiskSize}
										selectedVMGroup={selectedVMGroup}
										VMGname={VMGname}
										CPType={CPType}
										getClusters={props.getClusters}
									/>
								)
								: null
			}
		</Container>
	)
}
