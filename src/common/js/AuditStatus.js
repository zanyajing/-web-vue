export  function AuditStatus(status) {
	switch(status) {
		case 150:
			status = '已撤回';
			break;
		case 160:
			status = '已拒绝';
			break;
		case 170:
			status = '被退回';
			break;
		case 180:
			status = '待审核';
			break;
		case 190:
			status = '待审核';
			break;
		case 191:
			status = '审核未通过';
			break;
		case 200:
			status = '待审核';
			break;
		case 201:
			status = '审核未通过';
			break;
		case 202:
			status = '审核通过';
			break;
		case 500:
			status = '还款中';
			break;
		case 501:
			status = '已还款';
			break;
		case 502:
			status = '还款已逾期';
			break;
	}
	return status
}