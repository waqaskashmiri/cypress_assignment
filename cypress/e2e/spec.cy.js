/// <reference types='cypress'/>

describe('assignment', () => {
  it('open etsy website', () => {
    cy.visit('https://www.etsy.com/')
    
 })
  
  it('Create an account',() =>{
    cy.get('.signin-header-action').click();
    cy.get('#register').click();

    cy.get('#join_neu_email_field').type('testsoftests333@gmail.com');
    cy.get('#join_neu_first_name_field').type('Mr. tests');
    cy.get('#join_neu_password_field').type('test_1234{enter}');
    cy.get('.wt-menu__trigger__label > .wt-circle').click();
    cy.get(':nth-child(7) > .wt-menu__item > .wt-ml-xs-2 > .wt-text-caption').click();
    cy.url().should('contains', 'https://www.etsy.com/');
  })

  it('Required Fields on Sign In',() =>{
    cy.get('.signin-header-action').type('{enter}');
    cy.get('.wt-validation > .wt-btn').click();
    if(cy.get('[data-visible-error-placeholder=""] > .wt-alert')){
      cy.log("An error has occurred, please try again!");
    }else{
      cy.log("Email and Password can't be blank");
    }
    cy.get('#join_neu_email_field').type('testsoftests1@gmail.com');
    cy.get('#join_neu_password_field').type('test_1234{enter}');
    cy.get('.wt-menu__trigger__label > .wt-circle').click();
    cy.get(':nth-child(7) > .wt-menu__item > .wt-ml-xs-2 > .wt-text-caption').click();
    cy.url().should('contains', 'https://www.etsy.com/');
  })

  it('Gmail account creation',() =>{
    cy.get('.signin-header-action').click();
    const pop_url="https://accounts.google.com/o/oauth2/auth/identifier?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fwww.etsy.com%3Fid%3Dauth464972&response_type=code%20permission%20id_token&scope=openid%20profile%20email&openid.realm&include_granted_scopes=true&client_id=296956783393-2d8r0gljo87gjmdpmvkgbeasdmelq33e.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fwww.etsy.com&access_type=offline&prompt=consent&origin=https%3A%2F%2Fwww.etsy.com&gsiwebsdk=2&flowName=GeneralOAuthFlow";
    cy.window().then(win =>{
      const stub = cy.stub(win,'open').as('windowopen')
    })
    cy.get('[data-login-with-google=""] > .wt-btn').click()
    cy.get('@windowopen').should('be.calledWith',pop_url)
    cy.window().then(win =>{
      win.location.href = pop_url
      cy.get('#identifierId').type('johnfolio{enter}');
      cy.get('#password').type('test_1234{enter}');
    })  
  })

  it('Login with three different credentials', () =>{
    cy.get('.signin-header-action').click();
    cy.fixture('credentials1.json').then(user =>{
      cy.get('#join_neu_email_field').focus().type(user.email);
      cy.get('#join_neu_password_field').type(user.password,);
      cy.get('.wt-validation > .wt-btn').click();
    })
    const availablefixtures = [
      {
        name: "credentials1",
        context: "1",
      },
      {
        name: "credentials2",
        context: "2",
      },
      {
        name: "credentials3",
        context: "3",
      },
    ];
    availablefixtures.forEach(afixture =>{
      describe(afixture.context, () =>{
        beforeEach(function(){
        cy.fixture(afixture.name).as("userdetails");
          it("DDF", function(){
            cy.get('#join_neu_email_field').type(this.userdetails.email);
            cy.get('#join_neu_password_field').type(this.userdetails.password);
            cy.get('.wt-validation > .wt-btn').click();
          })
        })
      })
    })
  })

  it('Failed attempt to login',() =>{
    it('open etsy website')    
    cy.get('.signin-header-action').type('{enter}');
    cy.get('.wt-validation > .wt-btn').click();
    if(cy.get('[data-visible-error-placeholder=""] > .wt-alert')){
      cy.log("An error has occurred, please try again!");
    }else{
        cy.get('#join_neu_email_field').type('testsoftests1@gmail.com');
        cy.get('#join_neu_password_field').type('test_1111{enter}');
        cy.get('.wt-menu__trigger__label > .wt-circle').click();
        cy.get(':nth-child(7) > .wt-menu__item > .wt-ml-xs-2 > .wt-text-caption').click();
        cy.url().should('contains', 'https://www.etsy.com/');
    }
  })
 it('Add / Edit / Delete a product to cart', ()=>{
  cy.get('.wt-grid > :nth-child(1) > .wt-text-link-no-underline').click();
  cy.get('.wt-grid__item-xs-7 > .wt-btn').click();
  cy.get('.add-to-cart-form > div.wt-width-full > .wt-btn').click();
  cy.get('#cart-region-list-select').select('United States');
  cy.get('fieldset.wt-mt-xs-1 > .wt-text-title-01').should('contain',"How you'll pay").log('Product successfully added in cart!');
  cy.get('.wt-hide-xs > .wt-grid > .wt-grid__item-xs-5 > :nth-child(1) > :nth-child(1) > .wt-select > .wt-select__element').select('4');
  cy.contains('Remove').focus().click();
 })
})