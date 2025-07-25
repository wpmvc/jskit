import { Option } from '@wpmvc/components/build-types/gutenberg/image-choice/types';
import { BaseField, BaseFieldProps } from '../../types/field';

type Options = Array< Option >;

export type ImageChoiceType = BaseField & {
	type: 'imageChoice';
	options: Options | ( ( attributes: Record< string, any > ) => Options );
};

export type ImageChoiceProps = BaseFieldProps & {
	field: ImageChoiceType;
};
