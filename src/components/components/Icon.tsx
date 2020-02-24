import React from 'react';
import { iconsConfig } from '../../iconsConfig';

interface IIconProps {
	name: string;
	size: number;
	fill?: string;
}

const Icon = ({ name, size, fill }: IIconProps) => {
	const IconComponent = iconsConfig[name];
	return <IconComponent size={size} fill={fill} />;
};

export default Icon;
