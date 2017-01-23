<groups xmlns="http://www.isdc.ro/wro">
  <group name="angular-bootstrap">
  <css>webjar:bootstrap/3.2.0/less/bootstrap.less</css>   
    <css>file:${project.basedir}/src/main/wro/main.less</css>
    <js>webjar:jquery/2.1.1/jquery.min.js</js>
    <js>webjar:bootstrap/3.2.0/bootstrap.js</js>
    <js>webjar:angularjs/1.3.8/angular.min.js</js>
  </group>
</groups>



-------------------------------------------------------------------------------------------

@ComponentScan("com.javacodegeeks.examples")
16
public class WebConfig extends WebMvcConfigurerAdapter{
17
 
18
    @Override
19
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
20
        registry.addResourceHandler("/resources/static/js/**")
21
                .addResourceLocations("/resources/static/js/");
22
        registry.addResourceHandler("/resources/static/css/**")
23
                .addResourceLocations("/resources/static/css/");
24
        registry.addResourceHandler("/resources/static/views/**")
25
                .addResourceLocations("/resources/static/views/");
26
        registry.addResourceHandler("/resources/static/**")
27
                .addResourceLocations("/resources/static/");
28
        registry.addResourceHandler("/webjars/**")
29
                .addResourceLocations("/webjars/");
30
    }
31
 
32
    @Bean
33
    public ViewResolver getViewResolver(){
34
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
35
        resolver.setPrefix("/WEB-INF/jsp/");
36
        resolver.setSuffix(".jsp");
37
        return resolver;
38
    }
39
 
40
    @Override
41
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
42
        configurer.enable();
43
    }
44
}