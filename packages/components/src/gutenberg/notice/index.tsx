import { NoticeProps } from '@wordpress/components/build-types/notice/types';
import { StyledNotice } from './styles';

export default function Notice( props: NoticeProps ) {
	return <StyledNotice { ...props } />;
}
