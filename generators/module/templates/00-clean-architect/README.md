<%= config.name %>
--
Author: <%= config.author %>

-- put description here -- 

---
## Module Structure
```
.
└── [module-name]
    ├── application                  
    │   └── commands                <-- command list (see more Domain-Driven Design and CQRS)
    ├── domain                      <-- business logic
    │   ├── entities                <-- core entity
    │   ├── events                  <-- core event
    │   ├── exceptions              <-- core exception
    │   └── value-objects           <-- use to store small object that represents a simple entity whose equality is not based on identity, normally use to transfer data inside domain with self-validate
    ├── infrastructure              <-- integrate with framework
    │   ├── adapters                
    │   │   ├── primaries           <-- Primary adapters are incoming/entry points (delivery mechanisms, controllers) of your app
    │   │   │   ├── controllers     
    │   │   │   ├── dtos            
    │   │   │   └── guards          
    │   │   └── secondaries         <-- Secondary adapters are outgoing points of your app
    │   │       ├── fake
    │   │       └── real
    │   └── ports                   <-- Communicate between Domain and Infrastructure
    ├── [module-name].module.ts
    └── README.md
```

___
## Reference:

> Your architectures should tell readers about the system, not about the frameworks you used in your system — Robert C.Martin (Uncle Bob)

> FP and OO work nicely together. Both attributes are desirable as part of modern systems. A system that is built on both OO and FP principles will maximize flexibility, maintainability, testability, simplicity, and robustness. Excluding one in favor of the other can only weaken the structure of a system. - Robert C.Martin (Uncle Bob)

- https://medium.com/codex/clean-architecture-for-dummies-df6561d42c94
- https://medium.com/modern-software-architecture/modern-software-architecture-1-domain-driven-design-f06fad8695f9#:~:text=Domain%2Ddriven%20design%20(DDD),of%20the%20core%20business%20concepts.&text=%2D%20Initiate%20a%20creative%20collaboration%20between,conceptual%20heart%20of%20the%20problem.
- https://mostly-adequate.gitbook.io/mostly-adequate-guide/ (FP)
- https://github.com/VincentJouanne/nest-clean-architecture
- https://levelup.gitconnected.com/3-domain-centric-architectures-every-software-developer-should-know-a15727ada79f (Hexagonal Architecture, Onion Architecture & Clean Architecture)
