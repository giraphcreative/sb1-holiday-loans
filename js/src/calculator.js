

// a port of the excel pmt function.
function pmt(rate_per_period, number_of_payments, present_value, future_value, type){
    if(rate_per_period != 0.0){
        // Interest rate exists
        var q = Math.pow(1 + rate_per_period, number_of_payments);
        return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

    } else if(number_of_payments != 0.0){
        // No interest rate, but number of payments exists
        return -(future_value + present_value) / number_of_payments;
    }

    return 0;
}


$(function(){
	
	$(".numbers-only").keyup(function(){
		var fixed=$(this).val().replace(/[^0-9.]/g,"");
		$(this).val( fixed );
	});


	var calculate = function() {

		var interest_rate_cc = .28;
		var interest_rate_loan = .0599;

		var number_of_gifts = parseFloat( $('.number-of-gifts').val() );
		var cost_of_gifts = parseFloat( $('.amount-per-gift').val() );
		var loan_total = number_of_gifts * cost_of_gifts;

		var weekly = ( Math.ceil( pmt( interest_rate_loan/52, 52, loan_total, null, null ) * -100 ) / 100 ).toFixed(2);
		var bi_weekly = ( Math.ceil( pmt( interest_rate_loan/26, 26, loan_total, null, null ) * -100 ) / 100 ).toFixed(2);
		var monthly = ( Math.ceil( pmt( interest_rate_loan/12, 12, loan_total, null, null ) * -100 ) / 100 ).toFixed(2);
		var semi_monthly = ( Math.ceil( pmt( interest_rate_loan/24, 24, loan_total, null, null ) * -100 ) / 100 ).toFixed(2);

		var interest_loan = ( weekly * 52 ) - loan_total;
		var payment_cc = Math.ceil( pmt( interest_rate_cc/12, 12, loan_total, null, null ) * -100 ) / 100;
		var interest_cc = ( payment_cc * 12 ) - loan_total;

		var interest_savings = ( Math.ceil( ( interest_cc - interest_loan ) * 100 ) / 100 ).toFixed(2);

		$('.loan-total').html( loan_total );
		$('.payment-weekly').html( "$" + weekly );
		$('.payment-bi-weekly').html( "$" + bi_weekly );
		$('.payment-monthly').html( "$" + monthly );
		$('.payment-semi-monthly').html( "$" + semi_monthly );
		$('.savings-interest').html( interest_savings );

	}

	calculate();

	$(".number-of-gifts, .amount-per-gift").on( 'keyup', calculate );

	$(".container").fitVids();

});

