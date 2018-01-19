const select = require('./index')
const Provider = require('./Provider')
const sinon = require('sinon')

describe('Provider', () => {

    describe('should create a fb provider', () => {
        
        it('can ask for profile and contact information', () => {
            let stub = sinon.stub(select, 'select');
            
            // fake data to return by mocked provider
            const profile = {
                id: 1,
                name: 'Davis'
            }
            const contacts = []
            // mock facebook provider
            const fb = {
                me() {
                    return profile
                },
                contacts() {
                    return contacts
                }
            }

            stub.withArgs('facebook').returns(fb);            

            expect(
                Provider.for('facebook').me()
            ).toEqual(
                profile
            )
            expect(
                Provider.for('facebook').contacts()
            ).toEqual(
                contacts
            )
        })
    })    
})