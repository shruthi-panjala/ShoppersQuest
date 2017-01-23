package com.maven.selenium;

import org.testng.annotations.Test;



import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.PageFactory;
import org.testng.annotations.AfterTest;

public class OpenCartTest1 {
	WebDriver driver;
  @Tests
  public void registrationTest() {
	  Registration r= PageFactory.initElements(driver,Registration.class);
		r.accountReg(); 
	  RegistrationForm rf= PageFactory.initElements(driver,RegistrationForm.class);
	  RegSuccess rs= PageFactory.initElements(driver, RegSuccess.class);
	  
		
	  List<String[]> regDetails=rf.readFromExcel("D://SeleniumSW//register1.xlsx","registercred");
	//  System.out.println(regDetails.size());
	 // System.out.println("Loop   "+regDetails.get(0));
	 // System.out.println("Loop   "+regDetails.get(1));
	  String result="failure";
	  
	  int l=0;
	  for(;l<regDetails.size();l++)
	  {
		  //System.out.println("Loop   "+regDetails.get(0));
		    
		  rf.formFill(regDetails.get(l));
		 try{
			 
		 
		 if( rs.checkSucess())
		 { result="success";
		 }
		 else
		 {
			  result="failure";
		 }
			 
		 rs. writeInExcel(result,l+1);
		  //System.out.println("sucess");
		   
		  r.accountReg();
		  
		  }
		 catch(Exception e)
		 {
			 System.out.println(e);
			 System.out.println("Failure");
			 result="failure";
			 rs. writeInExcel(result,l+1);
		 }
		// break;
	  }
	  }
  @Test(enabled=false)
  public void pswdChnge()
  {
	  HomePage hp= PageFactory.initElements(driver,HomePage.class);
	  hp.gotologin();
	  LoginPage lp= PageFactory.initElements(driver,LoginPage.class);
	  lp.login("client@epam.com","admin");
	  Account act= PageFactory.initElements(driver,Account.class);
	  act.changepassword(); 
	  ChangePassword cp= PageFactory.initElements(driver,ChangePassword.class);
	  cp.chngePswd();
	  act.logout();
	  hp.gotologin();
	  lp.login("client@epam.com","client");
	  System.out.println("Password Succesfully changed");
	  
	  
}
  @Test(enabled=false)
 public void changeviews()
 {
	 
	  HomePage hp= PageFactory.initElements(driver,HomePage.class);
		 hp.camerasClick();
		 hp.cannonClick();
		 
		 
 }
	  
  
  /*@Test
  public void dataBaseCheck()
  {DataBaseCheck dbs=PageFactory.initElements(driver, DataBaseCheck.class);
 dbs.dBConnection("com.mysql.jdbc.Driver","jdbc:mysql://localhost/opencart?"+"user=root&password=root");
 try {
	dbs.readData();
} catch (Exception e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}*/
	  
	  
	  
  
  @Parameters("browserType")
  @BeforeTest
  public void beforeTest(String browser) {
		 driver=Drivers.getDriver(browser);
		 driver.get("http://localhost/opencart/upload");
		 System.out.println(driver.getTitle());
		/* Actions act=new Actions(driver);
		 act.keyDown(Keys.CONTROL).sendKeys("t").keyUp(Keys.CONTROL).perform();
		 		 driver.get("http://localhost/opencart/upload/admin");
		 String wind= driver.getWindowHandle();
		 System.out.println(wind);
		 System.out.println(driver.getTitle()); 
		
		
		// driver.switchTo().window(wind);
		
		//ArrayList<String> tabs =new ArrayList<String>(driver.getWindowHandles());
		 
		 
		//set<String> tabs= driver.getWindowHandles()
		String gototitle="Your Store";
		//System.out.println(tabs.size());}
		String presenttitle=null;
		presenttitle=driver.getTitle();
		while(!gototitle.equals(presenttitle))
		{
			act.keyDown(Keys.CONTROL).sendKeys(Keys.TAB).keyUp(Keys.CONTROL).perform();
			presenttitle=driver.getTitle();
		}
		System.out.println(driver.getTitle());
		//driver.switchTo().activeElement();

		//Iterator i=tabs.iterator();
		*/
	/*	while(i.hasNext())
			{
			
			
			presenttitle=driver.getTitle();
			System.out.println(presenttitle);
			if(gototitle.equals(presenttitle))
			{
				break;
			}
			driver.switchTo().window((String)i.next());
			//window((String)i.next()).
			//System.out.println((String)i.next());
			}
		//System.out.println("tab details"+tabs);
		
	 }
*/
  }
  @AfterTest
  public void afterTest() {
	 // driver.quit();
  }

}
