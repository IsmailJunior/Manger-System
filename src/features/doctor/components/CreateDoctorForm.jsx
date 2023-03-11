import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Form, Row} from 'react-bootstrap';
import { addDoctor } from '../doctorSlice';
import Control from '../../components/Control';
import Submit from '../../components/Submit';

const CreateDoctorForm = () =>
{
	const [ name, setName ] = useState( '' );
	const [ rank, setRank ] = useState( '' );
	const [ image, setImage ] = useState( '' );
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [ requestStatus, setRequestStatus ] = useState( 'idle' );

	const canSave = [ name, rank, image ].every( Boolean ) && requestStatus === 'idle';
	const onNameChanged = e => setName( e.target.value );
	const onRankChanged = e => setRank( e.target.value );
	const onImageChanged = e => setImage( e.target.value );

	const onSaveClicked = () =>
	{
		if (canSave)
		{
			try
			{
			setRequestStatus( 'pending' );
				dispatch( addDoctor( { name: name, rank: rank, image: image} ) ).unwrap();
				setName( '' );
				setRank( '' );
				setImage( '' );
				navigate( '/' );
			} catch ( error )
			{
				console.error( 'Error:' + error );
			} finally
			{
				setRequestStatus( 'idle' );
			}
		}
	}

	const controlSeed = [
		{name: 'Name', func: onNameChanged, value: name, placeholder: 'Enter Name', id: 'name'},
		{name: 'Rank', func: onRankChanged, value: rank, placeholder: 'Enter Rank', id: 'rank'},
		{name: 'Image', func: onImageChanged, value: image, placeholder: 'Enter Image', id: 'image'},
	]

	const controls = controlSeed.map( ( control ) => (
		<Control key={control.id} name={control.name} func={control.func} placeholder={control.placeholder} id={control.id} />
	))

  return (
	  <Form as={Row} className='justify-content-md-center'>
		  { controls }
		<Submit func={onSaveClicked} disabled={!canSave}>Save</Submit>
	</Form>
  )
}

export default CreateDoctorForm;
