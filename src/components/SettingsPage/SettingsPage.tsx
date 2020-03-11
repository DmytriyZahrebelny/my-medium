import React from 'react';
import { observer } from 'mobx-react';
import TextField from '../components/FormControls/TextField';
import TextareaField from '../components/FormControls/TextareaField';
import ErrorsMessages from '../components/ErrorsMessages/ErrorsMessages';
import { useSettingsHooks } from './useSettingsHooks';
import './settingsPage.sass';

const SettingsPage: React.FC = () => {
	const { errorsMesages, handleSubmit, getFieldProps, touched, errors } = useSettingsHooks();

	return (
		<div className='settings'>
			<h1 className='settings__title'>Your Settings</h1>
			{errorsMesages ? <ErrorsMessages errors={errorsMesages} /> : null}
			<form onSubmit={handleSubmit}>
				<TextField
					type='text'
					input={getFieldProps('image')}
					errors={errors}
					touched={touched}
					placeholder='URL of profile picture'
					required={false}
				/>
				<TextField
					type='text'
					input={getFieldProps('username')}
					errors={errors}
					touched={touched}
					placeholder='username'
				/>
				<div className='settings__textarea'>
					<TextareaField
						input={getFieldProps('bio')}
						errors={errors}
						touched={touched}
						placeholder='Short bio about you'
						required={false}
					/>
				</div>
				<TextField
					type='email'
					input={getFieldProps('email')}
					errors={errors}
					touched={touched}
					placeholder='email'
				/>
				<TextField
					type='password'
					input={getFieldProps('password')}
					errors={errors}
					touched={touched}
					placeholder='password'
					required={false}
				/>
				<button className='settings__btn' type='submit'>
					Update Settings
				</button>
			</form>
		</div>
	);
};

export default observer(SettingsPage);
