import { SolidDarkBgToggleActive as SolidButton } from '@/components/Button';
import Modal from '@/components/Modal';
import * as React from 'react';
import { confirmable, createConfirmation } from 'react-confirm';

interface IProps {
	proceedLabel?: string;
	cancelLabel?: string;
	title: string;
	confirmation: string;
	show: boolean;
	proceed: (answer: boolean) => void;
	enableEscape: boolean;
}

/* const confirmable = (Component) => class extends React.Component {

	const [show,setShow]=React.St
  dismiss() {
	this.setState({
	  show: false,
	}, () => {
	  this.props.dispose();
	});
  }
  cancel(value) {
	this.setState({
	  show: false,
	}, () => {
	  this.props.reject(value);
	});
  }
  proceed(value) {
	this.setState({
	  show: false,
	}, () => {
	  this.props.resolve(value);
	});
  }
  render() {
	return <Component proceed={::this.proceed} cancel={::this.cancel} dismiss={::this.dismiss} show={this.state.show} {...this.props}/>
  }
}
 */

const Confirmation: React.FC<IProps> = ({ show, proceed, confirmation, title, proceedLabel, cancelLabel }) => {
	return (
		<Modal isOpen={show} handleClose={() => proceed(false)}>
			<div className="flex-1 flex flex-col items-center justify-center w-full h-full ">
				<div className=" bg-ac-primary py-4 px-4 rounded-top-lg text-xl text-white shadow w-full font-semibold">
					Confirm
				</div>
				<div className="w-full mt-4 px-4">{confirmation}</div>
				<div className="flex my-4 justify-end w-full text-sm">
					<button
						className="py-2 px-4 my-2 mx-2 bg-ac-slate-dark text-white rounded-full"
						onClick={() => proceed(true)}
					>
						{proceedLabel ? proceedLabel : 'Ok'}
					</button>
					<button className="py-2 px-4 my-2 mx-2" onClick={() => proceed(false)}>
						{cancelLabel ? cancelLabel : 'Cancel'}
					</button>
				</div>
			</div>
		</Modal>
	);
};

export function confirm(confirmation: string, proceedLabel = 'OK', cancelLabel = 'Cancel', options: any = {}) {
	return createConfirmation(confirmable(Confirmation))({
		confirmation,
		proceedLabel,
		cancelLabel,
		...options
	});
}
