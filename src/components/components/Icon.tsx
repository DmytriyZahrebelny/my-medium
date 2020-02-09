import React from 'react';
import { iconsConfig } from '../../iconsConfig';

interface IIconProps {
	name: string;
	size: number;
}

const Icon = ({ name, size }: IIconProps) => {
	const IconComponent = iconsConfig[name];
	return <IconComponent size={size} />;
};

export default Icon;
