var user = new UserModel();
var App = Backbone.Router.extend({
	routes: {
		'home': 'profile',
		'edit': 'edit'
	},
	profile: function() {
		$('.page').hide();
		$('#profile').show();
	},
	edit: function() {
		$('.page').hide();
		$('#edit').show();
	}
});

$.get (
	'http://tiyfe.herokuapp.com/collections/profile-model-micko',
	function(response) {
		$('.profile-usertitle-name').text(response[0].name);
		$('.navbar-right .dropdown .dropdown-toggle').html(response[0].name + '<span class="caret"></span>');
		$('.profile-usertitle-job').text(response[0].role);
		$('#name').val(response[0].name);
		$('#inputEmail3').val(response[0].email);
		$('#role').val(response[0].role);
	},
	'json'
	)

// $('#name').val(user.get('name'));
// $('#inputEmail3').val(user.get('email'));
// $('#role').val(user.get('role'));

$('.form-horizontal').submit(function(e) {
	e.preventDefault();
	user.set({name: $('#name').val(), email: $('#inputEmail3').val(), role: $('#role').val()});
	console.log(user);
	$.post (
		'http://tiyfe.herokuapp.com/collections/profile-model-micko',
		{name: $('#name').val(), email: $('#inputEmail3').val(), role: $('#role').val()},
		function(result) {
			console.log('Posted to server');
		},
		'json'
		)
})

user.on('change', function() {
	$('.profile-usertitle-name').text($('#name').val());
	$('.navbar-right .dropdown .dropdown-toggle').html($('#name').val() + '<span class="caret"></span>');
	$('.profile-usertitle-job').text($('#role').val());
})

var app = new App();
Backbone.history.start();