var context = {
	"name":"Ritesh Kumar",
	"occupation" : "Developer"
}
var template=Handlebars.templates['templatesCompiled'];
var templateData=template(context);
document.getElementById("content").innerHTML+=templateData;
/*var templateScript = Handlebars.templates.demo(context);

document.write(templateScript);*/