/// <reference types="cypress" />

const baseUrl = `http://localhost:8000/`
context('Actions', () => {
    beforeEach(() => {
     /*  cy.visit(`${baseUrl}`) */
    })

    it('cy.visit() - visit a remote url', () => {
      cy.visit(baseUrl, {
        timeout: 50000, // increase total time for the visit to resolve
        onBeforeLoad (contentWindow) {
          // contentWindow is the remote page's window object
          expect(typeof contentWindow === 'object').to.be.true
        },
        onLoad (contentWindow) {
          // contentWindow is the remote page's window object
          expect(typeof contentWindow === 'object').to.be.true
        },
      })
      //official-site
      cy.get('.tst-official-site').should('have.attr','href','https://bcc.no/en/om_oss/')
      //  cy.get('.official-site').click()
      cy.get('.tst-contact').should('have.attr','href',`contact`)
      cy.get('.tst-languages-click')
      .click()
      
      cy
      .get('.tst-languages-list')
      .find('.tst-Español')
      .should('have.attr','href',`https://cristianismoactivo.org/`) //tst-Español 

      cy.get('.tst-top-nav-read').click({timeout:5000})
      cy.location('pathname').should('include',`/read`)

      cy.get('.tst-top-nav-listen').click({timeout:5000})
      cy.location('pathname').should('include',`/listen`)

      cy.get('.tst-top-nav-watch').click({timeout:5000})
      cy.location('pathname').should('include',`/watch`)

      cy.get('.tst-top-nav-explore').click({timeout:5000})
      cy.location('pathname').should('include',`/explore`)

      cy.get('.tst-top-nav-logo').click({timeout:5000})
      cy.location('pathname').should('include','/')
   
      cy.get('.tst-top-nav-menu-icon').click({timeout:5000})
      cy.get('.tst-side-menu-resource').click({timeout:5000})
      cy.get('.tst-side-menu-resource-back').click({timeout:5000})
      cy.get('.tst-side-menu-profile-close').click({timeout:5000})
      cy.get('.tst-desktop-header-post').click({timeout:5000})
      cy.get('.tst-top-nav-logo').click({timeout:5000})
      cy.get('.tst-latest-section-header').scrollIntoView().click()
/*       cy.get('.tst-top-nav-search-icon').click()
      cy.location('pathname').should('include',`/explore`) */
      
  })
})