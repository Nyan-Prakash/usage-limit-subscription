'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function UsageTracking() {
  const [usageCount, setUsageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const maxUsage = 100

  const handleClick = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/usage-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 1,
          priceId: 'price_123',
          subscriptionId: 'sub_123',
          usageMeterId: 'meter_123',
          transactionId: `txn_${Date.now()}`,
          properties: { feature: 'api-calls', endpoint: '/api/data' },
          usageDate: Date.now()
        })
      })
      
      if (response.ok) {
        setUsageCount(prev => prev + 1)
        alert('Usage event recorded!')
      } else {
        alert('Failed to record usage event')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to record usage event')
    } finally {
      setIsLoading(false)
    }
  }

  const percentage = (usageCount / maxUsage) * 100

  return (
    <div className="max-w-md mx-auto p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Usage Meter</h2>
        <p className="text-muted-foreground">
          {usageCount} / {maxUsage} API calls used
        </p>
      </div>
      
      {/* Usage Meter */}
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="text-right text-sm text-muted-foreground">
          {percentage.toFixed(1)}%
        </div>
      </div>

      <Button 
        onClick={handleClick} 
        disabled={isLoading || usageCount >= maxUsage}
        className="w-full"
      >
        {isLoading ? 'Recording...' : 'Use API (+1)'}
      </Button>
    </div>
  )
}
