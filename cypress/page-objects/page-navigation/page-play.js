/// <reference types = "cypress"/>

import { timeout } from "async"
import { time } from "systeminformation"


class PlayPage{

    elements = {
        sectElPlyBrd: "board"
    }

    checkShowPlayBoard(){
        cy.getByTestId(this.elements.sectElPlyBrd).should('be.visible')
    }
}
export default PlayPage